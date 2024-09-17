// components/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const MinisterForgotPassword = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.VITE_BACKEND_URL}/api/minister/forgot-password`, { email });
      toast.success("Password reset email sent");
      setSuccess("password has been successfully reset")
        navigate('/min-reset-password')
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
      setError("password not found")
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        {success && <p className='text-green-600 text-center'>{success}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded mt-4 hover:bg-indigo-600">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default MinisterForgotPassword;
