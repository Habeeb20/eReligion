import React from 'react';
import im1 from '../assets/religion/Rectangle 1.png'
import im2 from '../assets/religion/Rectangle 2.png'
const Land1 = () => {
  return (
    <div className="bg-[#f5f0e1] min-h-screen">
      {/* Header Section */}
      <div className="relative">
        {/* Background and overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-70 bg-[url('/your-image.jpg')]"></div>
        <div className="relative z-10 text-center pt-16 px-4 md:px-16">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1f1f7a]">
            Find, worship and Book with Ministries in Nigeria
          </h1>
          <p className="text-sm md:text-lg mt-4 text-[#1f1f7a]">
            Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Religion e.g christainity, islam"
              className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
            />
            <input
              type="text"
              placeholder="Location e.g Lagos, Abuja"
              className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
            />
            <button className="p-3 bg-indigo-900 text-white rounded-lg w-full md:w-auto">
              Search
            </button>
          </div>

          {/* Images */}
          <div className="flex flex-col md:flex-row justify-center items-center mt-12 space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex justify-center">
              <img
                src={im2}
                alt="Worship Image"
                className="rounded-lg shadow-lg"
                style={{
                  width: '150px',
                  height: 'auto',
                  border: '3px dashed orange',
                }}
              />
            </div>
            <div className="flex justify-center">
              <img
                src={im1}
                alt="Minister Image"
                className="rounded-full shadow-lg"
                style={{
                  width: '150px',
                  height: 'auto',
                  border: '3px dashed yellow',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Destinations */}
      <div className="mt-12 text-center px-4">
        <h2 className="text-lg font-semibold mb-4">Suggested Destinations in Nigeria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-indigo-900 text-white py-2 rounded-lg">Religious leaders in Lagos</button>
          <button className="bg-indigo-900 text-white py-2 rounded-lg">Religious leaders in Abuja</button>
          <button className="bg-indigo-900 text-white py-2 rounded-lg">Religious leaders in Enugu</button>
          <button className="bg-indigo-900 text-white py-2 rounded-lg">Religious leaders in Ibadan</button>
        </div>
      </div>
    </div>
  );
};

export default Land1;
