require(['$api/models', '$views/buttons#SubscribeButton'], function(models, SubscribeButton) {

  var player = models.player;
  var time = null;
  var track_num = 0;
  var playlist = [
    '2hNTfrAILBLesbPootV83e',
    '0dHfyOVYfwDoh37r1nCAoK',
    '2hNTfrAILBLesbPootV83e',
    '5c0Rzl2XRUmGJ2eaK6WWZE']
  
  var timeLapse = function() {
    var track = models.Track.fromURI('spotify:track:'+playlist[track_num]);

    console.log(track);

    if(time == null) {
      time = 0;
      player.playTrack(track);
      track_num++;
    } else if(time == 8) {
      player.playTrack(track);
      player.seek(130000);
      track_num++;
    } else if(time == 20) {
      player.playTrack(track);
      player.seek(30000);
      track_num++;
    } else if(time == 27) {
      player.playTrack(track);
      player.seek(60000);
    }

    document.getElementById("body").innerHTML = '<p><strong>:'+time+'</strong>  '+track+'</p>';
    time++;
  };

  setInterval(timeLapse,1000);
});