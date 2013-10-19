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
