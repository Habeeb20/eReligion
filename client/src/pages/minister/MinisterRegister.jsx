// src/components/Register.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Dummy data for states and LGAs (You can replace this with real data)
const statesWithLGAs = {
  Lagos: ['Ikeja', 'Epe', 'Ikorodu', 'Badagry'],
  Abuja: ['Gwagwalada', 'Kuje', 'Bwari', 'Abaji'],
  Kano: ['Dala', 'Fagge', 'Gwale', 'Nasarawa'],
};

const MinisterRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isMinister: true, // Always true
    ministryName: '',
    religion: '',
    address: '',
    state: '',
    LGA: '',
  });
  
  const [availableLGAs, setAvailableLGAs] = useState([]);

  // Handle state change to populate LGAs
  useEffect(() => {
    if (formData.state) {
      setAvailableLGAs(statesWithLGAs[formData.state]);
    } else {
      setAvailableLGAs([]);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/minister/register`, formData);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Minister Registration</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Ministry Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Ministry Name</label>
          <input
            type="text"
            name="ministryName"
            value={formData.ministryName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Religion */}
        <div className="mb-4">
          <label className="block text-gray-700">Religion</label>
          <select
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="">Select Religion</option>
            <option value="Pastor">Pastor</option>
            <option value="Islamic Cleric">Islamic Cleric</option>
            <option value="Traditionalist">Traditionalist</option>
            <option value="Buddhist">Buddhist</option>
          </select>
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-gray-700">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="">Select State</option>
            {Object.keys(statesWithLGAs).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* LGA */}
        <div className="mb-4">
          <label className="block text-gray-700">Local Government Area</label>
          <select
            name="LGA"
            value={formData.LGA}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
            disabled={!formData.state}
          >
            <option value="">Select LGA</option>
            {availableLGAs.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button type="submit" className="w-full bg-indigo-500 text-white p-2 rounded">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default MinisterRegister;
