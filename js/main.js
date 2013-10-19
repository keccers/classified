require(['$api/models', '$api/location'], function(models, location) {
  var user = models.User.fromURI(models.session.user.uri);

  user.load('username', 'name').done(function(u) {
    console.log(u.username);
    console.log(u.image);
  });

  var player = models.player;
  var profile = models.track;

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

  // setInterval(getTrack(),1000);

  $('.sp-button').on('click',function() { 
    getTrack();
    $.ajax({
      url: 'http://nsaify.herokuapp.com/user', 
      type: 'GET', 
      dataType: 'jsonp', 
      data: { name: user.username,
              track: getTrack(),
              position: getPos(),
              timestamp: new Date().getTime()
        }, 
      success:function(result){
        console.log(user.username);
      }
    });
  });
});



//   var player = models.player;
//   var time = null;
//   var track_num = 0;
//   var playlist = [
//     '2hNTfrAILBLesbPootV83e',
//     '0dHfyOVYfwDoh37r1nCAoK',
//     '2hNTfrAILBLesbPootV83e',
//     '5c0Rzl2XRUmGJ2eaK6WWZE']
  
//   var timeLapse = function() {
//     var track = models.Track.fromURI('spotify:track:'+playlist[track_num]);

//     console.log(track);

//     if(time == null) {
//       time = 0;
//       player.playTrack(track);
//       track_num++;
//     } else if(time == 8) {
//       player.playTrack(track);
//       player.seek(130000);
//       track_num++;
//     } else if(time == 20) {
//       player.playTrack(track);
//       player.seek(30000);
//       track_num++;
//     } else if(time == 27) {
//       player.playTrack(track);
//       player.seek(60000);
//     }

//     document.getElementById("body").innerHTML = '<p><strong>:'+time+'</strong>  '+track+'</p>';
//     time++;
//   };

//   setInterval(timeLapse,1000);
// });