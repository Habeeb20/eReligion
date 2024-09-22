import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useravatar from '../assets/user.png'
const MinisterGridDetails = () => {
  const { id } = useParams(); // Get the minister's ID from the URL
  const [minister, setMinister] = useState(null);

  // Fetch minister details by ID
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/minister/minister/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMinister(data); // Save the minister's data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  if (!minister) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="mt-12 px-4">
      <h2 className="text-lg font-semibold mb-4">
        Profile of {minister.title} {minister.firstname} {minister.lastname}
      </h2>

      <div className="p-4 rounded-lg shadow-lg bg-[#f5f0e1] text-left relative">
        {/* Leader Image */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={useravatar || '/path-to-default-avatar.jpg'}
            alt={`${minister.firstname} ${minister.lastname}`}
            className="rounded-full w-24 h-24 object-cover"
          />
          <div>
            <h3 className="font-bold text-[#1f1f7a] px-5 text-2xl">
              {minister.title} {minister.firstname} {minister.lastname}
            </h3>
            <p className="text-sm text-gray-500">
              Ministry: {minister.ministryName}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="text-sm text-gray-600 mt-2">
          <h4 className="font-semibold">Bio:</h4>
          <p>{minister.bio}</p>
        </div>

        {/* Religion & Location */}
        <div className="mt-4 text-sm text-gray-700">
          <h4 className="font-semibold">Religion:</h4>
          <p>{minister.religion}</p>
          <h4 className="font-semibold">Location:</h4>
          <p>
            {minister.localGovtArea}, {minister.state}
          </p>
        </div>

        {/* Contact Details */}
        <div className="mt-4 text-sm">
          <h4 className="font-semibold">Contact:</h4>
          <p>Email: {minister.email}</p>
          <p>Phone: {minister.phone}</p>
        </div>

        {/* Bank Details */}
        <div className="mt-4 text-sm">
          <h4 className="font-semibold">Bank Details:</h4>
          <p>Account Name: {minister.accountName}</p>
          <p>Account Number: {minister.accountNumber}</p>
          <p>Bank Name: {minister.bankName}</p>
        </div>
      </div>
    </div>
  );
};

export default MinisterGridDetails;
