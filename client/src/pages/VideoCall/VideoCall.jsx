import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimpleWebRTC from 'simplewebrtc';

const socket = io.connect('http://localhost:9000'); // Connect to Socket.IO server

const VideoCall = ({ roomID }) => {
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const webrtcRef = useRef();

  useEffect(() => {
    // Initialize SimpleWebRTC instance
    const webrtc = new SimpleWebRTC({
      localVideoEl: userVideo.current,   // Local video DOM element
      remoteVideosEl: '',                // Remote videos container (we'll handle it manually)
      autoRequestMedia: true,            // Request camera access automatically
      debug: false,
    });

    webrtcRef.current = webrtc;

    webrtc.on('localStream', (mediaStream) => {
      setStream(mediaStream);
      if (userVideo.current) {
        userVideo.current.srcObject = mediaStream;
      }
    });

    webrtc.on('videoAdded', (videoEl, peer) => {
      // When a partner's video is added, update the partner video ref
      partnerVideo.current.srcObject = videoEl.srcObject;
      setCallAccepted(true);
    });

    // Socket events for joining room and handling offers/answers
    socket.emit('join-room', roomID);

    socket.on('receive-offer', (offer) => {
      webrtc.handleMessage(offer);
    });

    socket.on('receive-answer', (answer) => {
      webrtc.handleMessage(answer);
    });

    socket.on('receive-ice-candidate', (candidate) => {
      webrtc.handleMessage(candidate);
    });

    return () => {
      socket.off('receive-offer');
      socket.off('receive-answer');
      socket.off('receive-ice-candidate');
      webrtc.stopLocalVideo();
    };
  }, [roomID]);

  const callUser = () => {
    setIsCalling(true);

    // Create a call to the room
    webrtcRef.current.joinRoom(roomID, (err, roomDescription) => {
      if (err) {
        console.error('Error joining the room', err);
        return;
      }
      console.log('Joined room', roomDescription);
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    webrtcRef.current.leaveRoom();
    webrtcRef.current.stopLocalVideo();
  };

  return (
    <div>
      <h2>Video Call</h2>
      <div>
        <video playsInline muted ref={userVideo} autoPlay style={{ width: '300px' }} />
        {callAccepted && !callEnded && (
          <video playsInline ref={partnerVideo} autoPlay style={{ width: '300px' }} />
        )}
      </div>

      <div>
        {isCalling || callAccepted ? (
          <button onClick={leaveCall}>End Call</button>
        ) : (
          <button onClick={callUser}>Call</button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
