import React, { useState } from 'react';
import axios from 'axios';

const ScheduleComponent = ({ user }) => {
  const [meetingDetails, setMeetingDetails] = useState({
    date: '',
    time: '',
    recipientEmail: '',
  });

  const [meetLink, setMeetLink] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails({ ...meetingDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:9000/api/schedule`, meetingDetails);

      if (response.data.success) {
        setMeetLink(response.data.meetLink);
        setError(''); // Clear error if successful
      }
    } catch (err) {
      console.error('Error scheduling meeting:', err);
      setError('Failed to schedule the meeting. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Schedule a Google Meet Call
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time:</label>
            <input
              type="time"
              name="time"
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient Email:</label>
            <input
              type="email"
              name="recipientEmail"
              value={meetingDetails.recipientEmail}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Schedule
          </button>
        </form>

        {meetLink && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
            <h3 className="text-lg font-semibold">Meeting Scheduled Successfully!</h3>
            <p>
              Google Meet Link:{' '}
              <a href={meetLink} className="text-blue-500 hover:underline">
                {meetLink}
              </a>
            </p>
          </div>
        )}

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ScheduleComponent;
