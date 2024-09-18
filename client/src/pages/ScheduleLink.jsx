// MeetingList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleLink = ({ userEmail }) => {
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/schedules/schedule/${userEmail}`);
                setMeetings(response.data.meetings);
            } catch (error) {
                setError('Error fetching meetings');
            }
        };

        fetchMeetings();
    }, [userEmail]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Scheduled Meetings</h2>
            {error && <p className="text-red-500">{error}</p>}
            {meetings.length === 0 ? (
                <p>No meetings scheduled.</p>
            ) : (
                <ul>
                    {meetings.map((meeting, index) => (
                        <li key={index} className="p-4 border-b border-gray-300">
                            <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
                            <p>Time: {new Date(meeting.date).toLocaleTimeString()}</p>
                            <p>Meeting Link: <a href={meeting.meetingLink} className="text-blue-500 hover:underline">Join Meeting</a></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ScheduleLink;
