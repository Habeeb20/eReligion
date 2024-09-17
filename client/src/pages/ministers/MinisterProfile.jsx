import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import im from "../../assets/religion/minister.png";
import NotificationProfile from '../Notification/NotificationProfile';
import Notification from '../Notification/Notification';
const MinisterProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const [appointment, setAppointment] = useState([])
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    bio: '',
    ministryname: '',
    state: '',
    localgovt: '',
    religion: '',
    bankname: '',
    accountname: '',
    accountnumber: '',
    history: [] // Default value for history
  });
  const [isEditing, setIsEditing] = useState({
    general: false,
    account: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [states, setStates] = useState([]); // Initializing as an empty array
  const [localGovts, setLocalGovts] = useState([]); // Initializing as an empty array


  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/minister/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", res.data); // Debugging line
        if (res.data) {
          setFormData(res.data);
          setProfile(res.data); // Optionally set profile state
        } else {
          console.error("No data found"); // Debugging line
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data.');
      }
    };

    fetchUserData();
  }, []);

  const navigate = useNavigate();

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
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/minister/minister/:id`, formData, {
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
        {/* <NotificationProfile /> */}
        <Notification />

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

        {formData && activeSection === 'general' && (
          <form onSubmit={(e) => handleSubmit(e, 'general')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname || ''}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname || ''}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ''}
                disabled
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state || ''}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="ministryname"
                placeholder="Ministry Name"
                value={formData.ministryname || ''}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="localgovt"
                placeholder="Local Government"
                value={formData.localgovt || ''}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="religion"
                placeholder="Religion"
                value={formData.religion || ''}
                onChange={handleChange}
                disabled={!isEditing.general}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio || ''}
              onChange={handleChange}
              disabled={!isEditing.general}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
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

        {formData && activeSection === 'account' && (
          <form onSubmit={(e) => handleSubmit(e, 'account')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="accountname"
                placeholder="Account Name"
                value={formData.accountname || ''}
                onChange={handleChange}
                disabled={!isEditing.account}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="accountnumber"
                placeholder="Account Number"
                value={formData.accountnumber || ''}
                onChange={handleChange}
                disabled={!isEditing.account}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="bankname"
                placeholder="Bank Name"
                value={formData.bankname || ''}
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

        {formData && activeSection === 'history' && (
          <div>
            {formData.history.length > 0 ? (
              <ul>
                {formData.history.map((item, index) => (
                  <li key={index} className="p-3 border-b border-gray-300">
                    <p><strong>Title:</strong> {item.title}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Date:</strong> {item.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No history available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MinisterProfile;
