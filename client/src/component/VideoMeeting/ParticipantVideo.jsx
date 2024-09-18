// import React from "react";
// import { useParticipant } from "@videosdk.live/react-sdk";

// const ParticipantVideo = ({ participantId }) => {
//   const { webcamOn, webcamStream, micOn, micStream } = useParticipant(participantId);

//   return (
//     <div>
//       <p>Participant {participantId}</p>
//       {webcamOn && <video srcObject={webcamStream} autoPlay />}
//       {micOn && <audio srcObject={micStream} autoPlay />}
//     </div>
//   );
// };

// export default ParticipantVideo;


import React from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

const ParticipantVideo = ({ participantId }) => {
  const { displayName, micOn, webcamOn, webcamStream, micStream } =
    useParticipant(participantId);

  return (
    <div>
      <p>{displayName}</p>
      {webcamOn && (
        <video autoPlay ref={(video) => video.srcObject = webcamStream} />
      )}
      {micOn && <audio autoPlay ref={(audio) => audio.srcObject = micStream} />}
    </div>
  );
};

export default ParticipantVideo;
