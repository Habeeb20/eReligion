// MeetingScheduler.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MeetingScheduler = () => {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    date: '',
    time: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to generate a Google Meet link
  const generateGoogleMeetLink = () => {
    // Normally, you'd use Google Meet API to generate a real link, but here's a placeholder
    return `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const meetLink = generateGoogleMeetLink();
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post('http://localhost:9000/api/schedules/meeting', {
        ...formData,
        meetLink,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success('Meeting scheduled successfully');
        setSuccess('Meeting scheduled successfully');
        setFormData({ recipientEmail: '', date: '', time: '' });
        alert('Meeting successfully scheduled');
      } else {
        throw new Error('Failed to schedule meeting');
      }
    } catch (err) {
      console.error('Error scheduling meeting:', err);
      setError('Failed to schedule meeting. Please try again.');
      toast.error('Failed to schedule meeting. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Schedule a Meeting</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="recipientEmail"
          placeholder="Recipient's Email"
          value={formData.recipientEmail}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="time"
          name="time"
          placeholder="Time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Schedule Meeting
        </button>
      </form>
    </div>
  );
};

export default MeetingScheduler;
