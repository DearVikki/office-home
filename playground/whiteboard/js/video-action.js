// 視頻部分
var hasWebcam, hasWebcamPermissions, hasMicrophone, hasMicrophonePermissions;
DetectRTC.load(function(){
  hasWebcam = DetectRTC.hasWebcam;
  hasWebcamPermissions = DetectRTC.isWebsiteHasWebcamPermissions;
  hasMicrophone = DetectRTC.hasMicrophone;
  hasMicrophonePermissions = DetectRTC.isWebsiteHasMicrophonePermissions;
  console.log(hasWebcam,hasWebcamPermissions,hasMicrophone,hasMicrophonePermissions)
})

var client, localStream, camera, microphone, audioSelect, videoSelect;
function join() {
  console.log("Init AgoraRTC client with vendor key: " + 'e22b85ca755f4c67be8d2cd2267c9339');
  client = AgoraRTC.createLiveClient();
  // for dynamic key
  /*client.init(dynamic_key, function () {*/
  client.init('e22b85ca755f4c67be8d2cd2267c9339', function () {
    console.log("AgoraRTC client initialized");
    // channel.value
    client.join(1000, undefined, function(uid) {
      console.log("User " + uid + " join channel successfully");
      if (document.getElementById("video").checked) {
        camera = videoSource.value;
        microphone = audioSource.value;
        localStream = AgoraRTC.createStream({streamID: uid, audio: true, cameraId: camera, microphoneId: microphone, video: document.getElementById("video").checked, screen: false});
        if (document.getElementById("video").checked) {
          localStream.setVideoProfile('720p_3');
        }
        localStream.init(function() {
          console.log("getUserMedia successfully");
          localStream.play('agora_local');

          client.publish(localStream, function (err) {
            console.log("Publish local stream error: " + err);
          });

          client.on('stream-published', function (evt) {
            console.log("Publish local stream successfully");
          });
        }, function (err) {
          console.log("getUserMedia failed", err);
        });
      }
    }, function(err) {
      console.log("Join channel failed", err);
    });
  }, function (err) {
    console.log("AgoraRTC client init failed", err);
  });

  client.on('stream-added', function (evt) {
    var stream = evt.stream;
    console.log("New stream added: " + stream.getId());
    console.log("Subscribe ", stream);
    client.subscribe(stream, function (err) {
      console.log("Subscribe stream failed", err);
    });
  });

  client.on('stream-subscribed', function (evt) {
    var stream = evt.stream;
    document.getElementById("agora_local").removeClass('big');
    console.log("Subscribe remote stream successfully: " + stream.getId());
    if ($('div#video #agora_remote'+stream.getId()).length === 0) {
      $('#video_part').append('<div class="agora-remote big" id="agora_remote'+stream.getId()+'"></div>');
      // $('#video_part').append('<div id="agora_remote"></div>');
    }
    stream.play('agora_remote' + stream.getId());
  });

  client.on('stream-removed', function (evt) {
    var stream = evt.stream;
    stream.stop();
    $('#agora_remote' + stream.getId()).remove();
    console.log("Remote stream is removed " + stream.getId());
  });

  client.on('peer-leave', function (evt) {
    var stream = evt.stream;
    stream.stop();
    document.getElementById("agora_local").addClass('big');
    $('#agora_remote' + stream.getId()).remove();
    console.log(evt.uid + " leaved from this channel");
  });
  // for dynamic key
  /*}
  });*/
}

function leave() {
  // document.getElementById("leave").disabled = true;
  client.leave(function () {
    console.log("Leavel channel successfully");
  }, function (err) {
    console.log("Leave channel failed");
  });
}

function publish() {
  document.getElementById("publish").disabled = true;
  client.publish(localStream, function (err) {
    console.log("Publish local stream error: " + err);
  });
}

function unpublish() {
  document.getElementById("publish").disabled = false;
  document.getElementById("unpublish").disabled = true;
  client.unpublish(localStream, function (err) {
    console.log("Unpublish local stream failed" + err);
  });
}

function getDevices() {
  AgoraRTC.getDevices(function (devices) {
    for (var i = 0; i !== devices.length; ++i) {
      var device = devices[i];
      var option = document.createElement('option');
      option.value = device.deviceId;
      if (device.kind === 'audioinput') {
        option.text = device.label || 'microphone ' + (audioSelect.length + 1);
        audioSelect.appendChild(option);
      } else if (device.kind === 'videoinput') {
        option.text = device.label || 'camera ' + (videoSelect.length + 1);
        videoSelect.appendChild(option);
      } else {
        console.log('Some other kind of source/device: ', device);
      }
    }
  });
}