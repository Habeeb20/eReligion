import React from 'react';
import { useEffect } from 'react';

const Choice1 = () => {
  // Continuous slide effect for the flags
  useEffect(() => {
    const slider = document.getElementById('flag-slider');
    let flagOffset = 0;

    const slideFlags = () => {
      flagOffset += 1;
      if (flagOffset >= slider.scrollWidth / 2) {
        flagOffset = 0;
      }
      slider.style.transform = `translateX(-${flagOffset}px)`;
    };

    const interval = setInterval(slideFlags, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 flex">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-yellow-100 p-8 border-r border-purple-300">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <img
            src="https://via.placeholder.com/100"
            alt="profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          {/* Name and Email */}
          <h1 className="text-blue-900 font-bold text-xl">James Johnson</h1>
          <p className="text-gray-600">jamesjohnson@gmail.com</p>

          {/* Icons */}
          <div className="flex mt-6 space-x-4">
            <button className="bg-gray-200 p-3 rounded-full">
              <i className="fas fa-home"></i>
            </button>
            <button className="bg-gray-200 p-3 rounded-full">
              <i className="fas fa-bell"></i>
            </button>
            <button className="bg-gray-200 p-3 rounded-full">
              <i className="fas fa-comment"></i>
            </button>
          </div>

          {/* Last Booked */}
          <h2 className="text-purple-900 font-bold mt-8">Last Booked</h2>
          <div className="flex mt-4">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <img
                  key={i}
                  src="https://via.placeholder.com/50"
                  alt="booked"
                  className="w-10 h-10 rounded-full mx-1"
                />
              ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex flex-col items-center">
        {/* Flag Slider */}
        <div className="w-full overflow-hidden">
          <div id="flag-slider" className="flex space-x-6 w-max">
            {Array(20)
              .fill('')
              .map((_, i) => (
                <img
                  key={i}
                  src={`https://via.placeholder.com/50x30?text=Flag${i + 1}`}
                  alt={`flag-${i}`}
                  className="w-16 h-10"
                />
              ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="mt-8 text-center w-full lg:w-2/3">
          <h2 className="text-lg font-bold text-blue-900">
            Identify the religion of your choice
          </h2>
          <p className="text-sm text-gray-600">
            Note: This is not your saved religion. This is just based on your current request
          </p>

          {/* Religion Selection */}
          <div className="flex justify-center mt-6 space-x-4">
            {['Christian', 'Muslim', 'Traditional', 'Buddhist'].map((religion) => (
              <button
                key={religion}
                className="bg-yellow-300 text-blue-900 font-semibold px-4 py-2 rounded-lg"
              >
                {religion}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <input
              type="text"
              placeholder="Religion"
              className="bg-white border border-gray-300 px-4 py-3 rounded-md w-full lg:w-1/3"
            />
            <input
              type="text"
              placeholder="Location"
              className="bg-white border border-gray-300 px-4 py-3 rounded-md w-full lg:w-1/3"
            />
          </div>

          {/* Search Button */}
          <button className="mt-6 bg-blue-900 text-white px-8 py-3 rounded-lg">
            Search
          </button>
        </div>

        {/* Selected Images */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array(8)
            .fill('')
            .map((_, i) => (
              <img
                key={i}
                src="https://via.placeholder.com/60"
                alt="selected"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Choice1;
