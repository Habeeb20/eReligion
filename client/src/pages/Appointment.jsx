// MinisterProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointment = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/minister/${userId}/appointments`);
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, [userId]);

  const handleResponse = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/appointments/${appointmentId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prev) => prev.map(app =>
        app._id === appointmentId ? { ...app, status } : app
      ));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-7">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <ul>
        {appointments.map((app) => (
          <li key={app._id} className="border p-4 mb-4 rounded">
            <p><strong>Name:</strong> {app.name}</p>
            <p><strong>Date:</strong> {new Date(app.date).toDateString()}</p>
            <p><strong>Time:</strong> {app.time}</p>
            <p><strong>Status:</strong> {app.status}</p>
            {app.status === 'Pending' && (
              <div>
                <button onClick={() => handleResponse(app._id, 'Accepted')} className="bg-green-500 text-white p-2 rounded mr-2">Accept</button>
                <button onClick={() => handleResponse(app._id, 'Rejected')} className="bg-red-500 text-white p-2 rounded">Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointment;
