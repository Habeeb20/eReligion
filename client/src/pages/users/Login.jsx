// components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import im from "../../assets/img3.png"
import { Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      toast.success("successful")
      navigate('/profile');

    } catch (err) {
      console.log(err)
      setError('Login failed, please check your credentials.');
      toast.error(" an error occurred")
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6 rounded-lg">
          <img
            src={im}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-navy-blue"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded mt-4 hover:bg-indigo-600">
          Login
        </button>
        <Link to='/forgot-password'>
          <h4 className='p-3 hover:text-indigo-800'>Forgot Password?</h4>
        </Link>

        <Link to='/register'><h4 className='p-3 hover:text-indigo-800'>Don't have an account? sign up</h4></Link>
        <Link to='/ministerlogin'><h4 className='p-3 hover:text-indigo-500'>Log in as a minister?</h4></Link>
      </form>

    </div>
  );
};

export default Login;
