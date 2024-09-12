import React, { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    bio: '',
    password: '',
    accountName: '',
    accountNumber: '',
    bankName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, formData);
      alert('User Registered Successfully');
    } catch (error) {
      alert('Registration Failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="block w-full p-2 mb-4 border"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="block w-full p-2 mb-4 border"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="block w-full p-2 mb-4 border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="block w-full p-2 mb-4 border"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
