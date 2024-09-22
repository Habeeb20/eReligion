import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import im from '../../assets/religion/minister.png'
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
      console.log(res.data);
      toast.success('Login successful');
      navigate('/minister/profile'); 
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      setError("Login failed, please check your credentials and try again");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex items-center justify-center mb-6 rounded-lg">
          <img
            src={im}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-navy-blue"
          />
        </div>
        <h2 className='text-2xl font-semibold text-blue-900 text-center mb-6'>Minister Login</h2>

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
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>

     
        <Link to='/min-forgot-password'>
                   <h4 className='p-3 hover:text-indigo-800'>Forgot Password?</h4>
                 </Link>
                 
                 <Link to='/popminister'><h4 className='p-3 hover:text-indigo-800'>Don't have an account? sign up</h4></Link>
                 <Link to='/login'><h4 className='p-3 hover:text-indigo-500'>Log in as a user/follower?</h4></Link>
      </form>
     
    </div>
  );
};

export default MinisterLogin;
