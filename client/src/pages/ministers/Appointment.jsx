import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Appointment = () => {
  const { id } = useParams(); // Minister ID from URL
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // JWT token from login
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/minister/${id}/appointment`,
        appointmentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Appointment requested successfully');
    } catch (err) {
      console.error(err);
      alert('Error booking appointment');
    }
  };

  return (
    <div className="container mx-auto p-4 mt-7">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={appointmentData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="date"
          name="date"
          value={appointmentData.date}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="time"
          name="time"
          value={appointmentData.time}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-800 text-white p-2 rounded w-full">Book Appointment</button>
      </form>
    </div>
  );
};

export default Appointment;
