// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import im from '../../assets/religion/minister.png'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const MinisterLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/minister/login`, formData);
      const {token} = res.data;
      localStorage.setItem('token', token);
      toast.success('Login successful');
      navigate('/profile')
    } catch (error) {
        setError('Login failed, please check your credentials')
      toast.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* <h1 className="text-3xl font-bold mb-6">Login</h1> */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex items-center justify-center mb-6 rounded-lg">
          <img
            src={im} 
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-navy-blue"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Login as a minister of God</h2>
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
        {error && <p className='text-red-500 text-center'>{error}</p>}

        {/* Submit Button */}
        <div className="mb-4">
          <button type="submit" className="w-full bg-indigo-900 text-white p-2 rounded hover:bg-indigo-600">
            Login
          </button>
        </div>
        <Link to='/ministerregister'><h4 className='p-3 hover:text-indigo-800'>Don't have an account? sign up</h4></Link>
        <Link to='/login'><h4 className='p-3 hover:text-indigo-500'>Log in as a user/follower?</h4></Link>
      </form>
    </div>
  );
};

export default MinisterLogin;
