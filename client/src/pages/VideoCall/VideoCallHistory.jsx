import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VideoCallHistory = () => {
  const { id } = useParams(); // Minister ID
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ministers/${id}/video-call-history`);
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Call History</h1>
      <ul>
        {history.map((call, index) => (
          <li key={index} className="border p-2 rounded mb-2">
            <p><strong>Respondent:</strong> {call.respondent}</p>
            <p><strong>Date:</strong> {call.date}</p>
            <p><strong>Time:</strong> {call.time}</p>
            <p><strong>Duration:</strong> {call.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoCallHistory;
