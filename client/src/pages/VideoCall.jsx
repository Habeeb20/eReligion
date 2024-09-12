import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const VideoCall = () => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('');
  const myVideo = useRef();
  const remoteVideo = useRef();
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    peerInstance.current = peer;

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        myVideo.current.srcObject = stream;
        myVideo.current.play();
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          remoteVideo.current.srcObject = remoteStream;
          remoteVideo.current.play();
        });
      });
    });
  }, []);

  const callPeer = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      const call = peerInstance.current.call(remotePeerId, stream);
      call.on('stream', (remoteStream) => {
        remoteVideo.current.srcObject = remoteStream;
        remoteVideo.current.play();
      });
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-lg font-bold">Video Call</h2>
      <div>
        <p>Your Peer ID: {peerId}</p>
        <input
          type="text"
          placeholder="Enter Remote Peer ID"
          onChange={(e) => setRemotePeerId(e.target.value)}
          className="block w-full p-2 border mb-2"
        />
        <button onClick={callPeer} className="bg-blue-500 text-white p-2">Call</button>
      </div>

      <div className="mt-5">
        <h3>Your Video</h3>
        <video ref={myVideo} className="w-full bg-gray-200"></video>
      </div>

      <div className="mt-5">
        <h3>Remote Video</h3>
        <video ref={remoteVideo} className="w-full bg-gray-200"></video>
      </div>
    </div>
  );
};

export default VideoCall;













// import React, { useEffect, useRef } from 'react';
// import Peer from 'peerjs';

// const VideoCall = () => {
//   const videoRef = useRef();

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on('open', (id) => {
//       console.log('My peer ID is:', id);
//     });

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       videoRef.current.srcObject = stream;
//       videoRef.current.play();

//       peer.on('call', (call) => {
//         call.answer(stream); // Answer the call with your stream
//         call.on('stream', (remoteStream) => {
//           // Show stream in some <video> element.
//           videoRef.current.srcObject = remoteStream;
//         });
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <video ref={videoRef} width="600" height="400" />
//     </div>
//   );
// };

// export default VideoCall;
