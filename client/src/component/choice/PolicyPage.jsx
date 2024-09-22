// App.js
import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';


 

function PolicyPage() {

 const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
 navigate('/ministerregister');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-2/3">
        <h2 className="text-2xl font-semibold text-center mb-4">Policy Agreement</h2>
        <p className="text-gray-600 mb-8">
           the write-up about the policy and agreement for becoming a minister.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <input type="radio" className="mr-2" required /> I agree to the terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}



export default PolicyPage ;
