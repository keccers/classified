require(['$api/models', '$api/models#User', '$api/location', '$views/popup'], function(models, location, popup) {

  var user = models.User.fromURI(models.session.user.uri);

  user.load('username', 'name').done(function(u) {
    console.log(u.username);
    console.log(u.image);
    var user = document.getElementById('user');
    user.innerHTML = user.innerHTML + "<img class='profile-pic' src='" + u.image + "'/><br/><span class='username'>" + u.username + "</span><br/><span class='real-name'>" + u.name + "</span><br/><span class='listening'>Listening to:";
  });

  var player = models.player;
  var profile = models.track;

  var track = models.Track.fromURI('spotify:track:2hNTfrAILBLesbPootV83e');
  player.playTrack(track);
  
  var timeLapse = function() {
    player.load('track').done(function(prop) {
      console.log(prop.track.uri);
    });
    player.load('position').done(function(prop) {
      console.log(prop.position);
    });
  };
    setInterval(timeLapse,1000);
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