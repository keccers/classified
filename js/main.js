require(['$api/models'], function(models) {
  var user = models.User.fromURI(models.session.user.uri);
  var player = models.player;

  var getTrack = function() {
    var currentTrack = null;
    player.load('track').done(function(prop) {
      currentTrack = prop.track.uri;
    });
    return currentTrack;
  };

  var getPos = function() {
    var currentPos = null;
    player.load('position').done(function(prop) {
      currentPos = prop.position;
    });
    return currentPos;
  };


      var w = 1000, h = 800;

      var labelDistance = 0;

      var vis = d3.select("#graph").append("svg:svg").attr("width", w).attr("height", h);

      var names = ['Julia', 'Elizabeth', 'Michael', 'Erick', 'Abi', 'Priya', 'Andrew']
      var nodes = [];
      var labelAnchors = [];
      var labelAnchorLinks = [];
      var links = [];

      //generating data
      for(var i = 0; i < names.length; i++) {
        var node = {
          label : names[i], 
          title : "MWHiwjoi"
        };
        nodes.push(node);
        labelAnchors.push({
          node : node
        });
        labelAnchors.push({
          node : node
        });
      };

      // console.log(nodes);

      for(var i = 0; i < nodes.length; i++) {
        for(var j = 0; j < i; j++) {
          if(Math.random() > 0)
            links.push({
              source : i,
              target : j,
              weight : Math.random()
            });
        }
        labelAnchorLinks.push({
          source : i * 2,
          target : i * 2 + 1,
          weight : 1
        });
      };


      // End Generating data

      var force = d3.layout.force().size([w, h]).nodes(nodes).links(links).gravity(1).linkDistance(500).charge(-3000).linkStrength(function(x) {
        return x.weight * 10
      });


      force.start();

      var force2 = d3.layout.force().nodes(labelAnchors).links(labelAnchorLinks).gravity(0).linkDistance(0).linkStrength(8).charge(-100).size([w, h]);
      force2.start();

      var link = vis.selectAll("line.link").data(links).enter().append("svg:line").attr("class", "link").style("stroke", "#CCC");

      var node = vis.selectAll("g.node").data(force.nodes()).enter().append("svg:g").attr("class", "node");
      node.append("svg:circle").attr("r", 5).style("fill", "#fff").style("stroke", "#FFF").style("stroke-width", 3);
      node.call(force.drag);


      var anchorLink = vis.selectAll("line.anchorLink").data(labelAnchorLinks)//.enter().append("svg:line").attr("class", "anchorLink").style("stroke", "#999");

      var anchorNode = vis.selectAll("g.anchorNode").data(force2.nodes()).enter().append("svg:g").attr("class", "anchorNode");
      anchorNode.append("svg:circle").attr("r", 0).style("fill", "#FFF");
        anchorNode.append("svg:text").text(function(d, i) {
        return i % 2 == 0 ? "" : d.node.label
      }).style("fill", "#72ba52").style("font-family", "Helvetica").style("font-size", 20).style("font-weight", 'bold');

      var updateLink = function() {
        this.attr("x1", function(d) {
          return d.source.x;
        }).attr("y1", function(d) {
          return d.source.y;
        }).attr("x2", function(d) {
          return d.target.x;
        }).attr("y2", function(d) {
          return d.target.y;
        });

      }

      var updateNode = function() {
        this.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      }


      force.on("tick", function() {

        force2.start();

        node.call(updateNode);

        anchorNode.each(function(d, i) {
          if(i % 2 == 0) {
            d.x = d.node.x;
            d.y = d.node.y;
          } else {
            var b = this.childNodes[1].getBBox();

            var diffX = d.x - d.node.x;
            var diffY = d.y - d.node.y;

            var dist = Math.sqrt(diffX * diffX + diffY * diffY);

            var shiftX = b.width * (diffX - dist) / (dist * 2);
            shiftX = Math.max(-b.width, Math.min(0, shiftX));
            var shiftY = 5;
            this.childNodes[1].setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
          }
        });


        anchorNode.call(updateNode);

        link.call(updateLink);
        anchorLink.call(updateLink);

      });

  $('.anchorNode').on("click", function(d) {
    $('#basic-modal-content').modal();
  });

  var update = function() { 
    getTrack();
    $.ajax({
      url: 'http://nsaify.herokuapp.com/user', 
      type: 'GET', 
      dataType: 'jsonp', 
      data: { name: user.username,
              track: getTrack(),
              position: getPos(),
              timestamp: new Date().getTime() }, 
      success: function(response) {
        $.each(response, function(username, attrs) {
          var user = models.User.fromUsername(username);
          user.load('image', 'name').done(function(u) {
            attrs['name'] = u.name;
            attrs['image'] = u.image;
            renderUser(user, attrs);
          });
        });
      }
    });
  };
  setInterval(update(),5000);
});




