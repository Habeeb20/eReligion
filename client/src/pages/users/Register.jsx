// components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import im from '../../assets/img3.png';
import { Link } from 'react-router-dom';
const Register = () => {
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
    isMinister: false,
    ministerName: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, formData);
      console.log(res.data);
      toast.success("successfully registered")
      navigate('/login');
    } catch (err) {
      toast.error("an error occurred")
      console.log(error)
      setError('Registration failed, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6 rounded-lg">
          <img
            src={im} 
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-navy-blue"
          />
        </div>
        <h2 className="text-2xl font-semibold text-blue-900 text-center mb-6">Register</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              name="accountName"
              placeholder="Account Name"
              value={formData.accountName}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
          </div>

          {/* Right Column */}
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
          </div>
        </div>

        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-4">
          <input
            type="checkbox"
            name="isMinister"
            checked={formData.isMinister}
            onChange={() => setFormData({ ...formData, isMinister: !formData.isMinister })}
            className="mr-2"
          />
          Register as a Minister
        </label>

        {formData.isMinister && (
          <input
            type="text"
            name="ministerName"
            placeholder="Minister Name"
            value={formData.ministerName}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded mt-4 hover:bg-indigo-700">
          Register
        </button>
        <Link to='/login'><h4 className='p-3 hover:text-indigo-800'>Already have an account? sign in</h4></Link>
      </form>
    </div>
  );
};

export default Register;
