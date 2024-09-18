// import "./App.css";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   MeetingProvider,
//   MeetingConsumer,
//   useMeeting,
//   useParticipant,
// } from "@videosdk.live/react-sdk";
// import { authToken, createMeeting } from "./Api";
// import ReactPlayer from "react-player";

// function JoinScreen({ getMeetingAndToken }) {
//   return null;
// }

// function ParticipantView(props) {
//   return null;
// }

// function Controls(props) {
//   return null;
// }

// function MeetingView(props) {
//   return null;
// }

// function VideoMeetingApp() {
//   const [meetingId, setMeetingId] = useState(null);

//   //Getting the meeting id by calling the api we just wrote
//   const getMeetingAndToken = async (id) => {
//     const meetingId =
//       id == null ? await createMeeting({ token: authToken }) : id;
//     setMeetingId(meetingId);
//   };

//   //This will set Meeting Id to null when meeting is left or ended
//   const onMeetingLeave = () => {
//     setMeetingId(null);
//   };

//   return authToken && meetingId ? (
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//         name: "C.V. Raman",
//       }}
//       token={authToken}
//     >
//       <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//     </MeetingProvider>
//   ) : (
//     <JoinScreen getMeetingAndToken={getMeetingAndToken} />
//   );
// }

// export default VideoMeetingApp;



import { MeetingProvider } from "@videosdk.live/react-sdk";

import VideoMeeting from "./VideoMeeting";

import React, {useState, useEffect} from 'react'

const VideoMeetingApp = () => {
    const [token, setToken] = useState("");

  // Fetch token from your backend server
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("http://localhost:9000/get-token"); // Replace with your token API URL
        const data = await response.json();
        setToken(data.token); // Set the token to state
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }
  return (
    <MeetingProvider token={token}>
    <div className="App">
      <h1>Video SDK Meeting App</h1>
      <VideoMeeting /> 
    </div>
  </MeetingProvider>

  )
}

export default VideoMeetingApp
