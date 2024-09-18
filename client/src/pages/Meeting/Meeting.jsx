import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Meeting = ({ user }) => {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/schedules/meeting/${user.email}`);
        if (response.data && response.data.meetings) {
          setMeetings(response.data.meetings);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        setError('Error fetching meetings. Please try again later.');
        console.error('Error fetching meetings', error);
      }
    };

    if (user.email) {
      fetchMeetings();
    }
  }, [user.email]);

  return (
    <div className="dashboard p-4">
      <h2 className="text-2xl font-bold mb-4">Scheduled Meetings</h2>
      {error && <p className="text-red-500">{error}</p>}
      {meetings.length === 0 ? (
        <p>No meetings scheduled.</p>
      ) : (
        <ul>
          {meetings.map((meeting, index) => (
            <li key={index} className="p-4 border-b border-gray-300">
              <p><strong>Date:</strong> {meeting.date}</p>
              <p><strong>Time:</strong> {meeting.time}</p>
              <p><strong>Sender:</strong> {meeting.senderEmail}</p>
              <a href={meeting.meetLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                Join Meeting
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Meeting;
