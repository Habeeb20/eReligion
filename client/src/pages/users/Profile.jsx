import React, { useState, useEffect } from 'react';
import axios from 'axios';
import im from "../../assets/img3.png";
import toast from 'react-hot-toast';
import AllMinister from '../ministers/AllMinisters';

import MeetingScheduler from '../Meeting/MeetingScheduler';
import { Link } from 'react-router-dom';
import UserChat from '../Chat/UserChat';

const Profile = ({userId}) => {
  const [activeSection, setActiveSection] = useState('general');
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    bio: '',
    accountName: '',
    accountNumber: '',
    bankName: '',
    history: [],
  });

  const [isEditing, setIsEditing] = useState({
    general: false,
    account: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/appointments/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e, section) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully");
      setSuccess('Profile updated successfully!');
      setIsEditing({
        ...isEditing,
        [section]: false,
      });
    } catch (err) {
      setError('Profile update failed. Please try again.');
      toast.error("Profile update failed, please try again");
    }
  };

  const handleEditClick = (section) => {
    setIsEditing({
      ...isEditing,
      [section]: !isEditing[section], // Toggle between edit and view mode
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6 rounded-lg">
          <img
            src={im} 
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-navy-blue"
          />
        </div>
        <h2 className="text-3xl font-semibold text-blue-900 text-center mb-6 text-navy-blue">Profile</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveSection('general')}
            className={`mr-4 px-4 py-2 rounded-lg ${activeSection === 'general' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-black'}`}
          >
            General
          </button>
          <button
            onClick={() => setActiveSection('account')}
            className={`mr-4 px-4 py-2 rounded-lg ${activeSection === 'account' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-black'}`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveSection('history')}
            className={`px-4 py-2 rounded-lg ${activeSection === 'history' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-black'}`}
          >
            History
          </button>
        </div>

        {activeSection === 'general' && (
          <form onSubmit={(e) => handleSubmit(e, 'general')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                disabled
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
             
            </div>
            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing.general}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            {/* <AllMinister /> */}
            {/* <ScheduleComponent /> */}
            {/* <MeetingScheduler /> */}
            {/* <UserChat /> */}
            <Link to='/chatlogin'><button className='px-8'>View chat</button></Link>
            <Link to='/choice'><button>Choice</button></Link>
            
            
            <button
              type="button"
              onClick={() => handleEditClick('general')}
              className={`${
                isEditing.general ? 'bg-green-500' : 'bg-navy-blue'
              } text-white p-3 rounded-md hover:${
                isEditing.general ? 'bg-green-600' : 'bg-navy-blue-dark'
              }`}
            >
              {isEditing.general ? 'Save Changes' : 'Edit General'}
            </button>
          </form>
        )}

        {activeSection === 'account' && (
          <form onSubmit={(e) => handleSubmit(e, 'account')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="accountName"
                placeholder="Account Name"
                value={formData.accountName}
                onChange={handleChange}
                disabled={!isEditing.account}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                disabled={!isEditing.account}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange}
                disabled={!isEditing.account}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="button"
              onClick={() => handleEditClick('account')}
              className={`${
                isEditing.account ? 'bg-green-500' : 'bg-navy-blue'
              } text-white p-3 rounded-md hover:${
                isEditing.account ? 'bg-green-600' : 'bg-navy-blue-dark'
              }`}
            >
              {isEditing.account ? 'Save Changes' : 'Edit Account'}
            </button>
          </form>
        )}

        {activeSection === 'history' && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-navy-blue">History:</h3>
            {/* {formData.history.length > 0 ? (
              formData.history.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                  <p className="text-black">
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p className="text-black">
                    <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p className="text-black">
                    <strong>Time:</strong> {item.time}
                  </p>
                 
                </div>
              ))
            ) : (
              <p className="text-black">No history available.</p>
              
            )} */}
              <ul className="list-disc pl-5">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li key={appointment._id} className="mb-2 p-2 border-b border-gray-300">
                <strong>Minister: </strong> {appointment.name} <br />
                <strong>Date: </strong> {appointment.date} <br />
                <strong>Time: </strong> {appointment.time}
              </li>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
