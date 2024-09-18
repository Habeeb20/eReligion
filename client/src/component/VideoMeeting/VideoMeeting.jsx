import React, { useEffect, useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantVideo from "./ParticipantVideo";
const VideoMeeting = () => {
  const [meetingId, setMeetingId] = useState("");
  const [token, setToken] = useState("");

  const { join, leave, toggleMic, toggleWebcam, toggleScreenShare, participants } =
    useMeeting({
      onMeetingJoined: () => console.log("Meeting joined"),
      onMeetingLeft: () => console.log("Meeting left"),
    });

  // Fetch token from backend on component mount
  useEffect(() => {
    const creatMeeting = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-token`); // Backend URL to get token
      const {meetingId} = await response.json();
      setMeetingId(meetingId);
      join();
    };
    createMeeting();
  }, [join]);

  // const handleJoin = () => {
  //   if (token && meetingId) {
  //     join(meetingId, token);
  //   }
  // };

  const handleLeave = () => leave();

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Enter Meeting ID"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
      />
      <button onClick={handleJoin}>Join Meeting</button>
      <button onClick={handleLeave}>Leave Meeting</button>
      <button onClick={toggleMic}>Toggle Mic</button>
      <button onClick={toggleWebcam}>Toggle Webcam</button>
      <button onClick={toggleScreenShare}>Toggle Screen Share</button>

      <div>
        {Array.from(participants).map(([participantId, participant]) => (
          <div key={participantId}>
            <p>{participant.displayName}</p>
            <p>{participant.audio ? "Audio On" : "Audio Off"}</p>
            <p>{participant.video ? "Video On" : "Video Off"}</p>
          </div>
        ))}
      </div> */}

<div className="video-container">
        {Array.from(participants.keys()).map((participantId) => (
          <ParticipantView
            key={participantId}
            participantId={participantId}
          />
        ))}
      </div>

      <button onClick={leave}>Leave Meeting</button>


    </div>
  );
};

export default VideoMeeting;
