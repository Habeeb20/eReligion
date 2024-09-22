import React, { useEffect, useState } from 'react';
import im from "../assets/religion/sc.png";
import im1 from "../assets/religion/sc1.png";
import im2 from "../assets/religion/sc3.png";
import { FaEnvelope } from 'react-icons/fa';

const Land4 = () => {
  const [ministers, setMinisters] = useState([]);

  // Fetch minister data from API
  useEffect(() => {
    const fetchMinisters = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/minister/ministers');
        const data = await response.json();
        setMinisters(data);
      } catch (error) {
        console.error('Error fetching ministers:', error);
      }
    };

    fetchMinisters();
  }, []);

  return (
    <div className="bg-blue-900 text-white min-h-screen flex items-center justify-center px-6 py-12 mt-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-2xl font-bold text-white leading-tight mb-4">
            Serve God Anywhere in the world <br /> and avoid <span className="text-white">SCAMMERS</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God.
          </p>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-400">
            Report a scam
          </button>
        </div>

        {/* Right Content (Ministers' Details) */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-6">
            {ministers.length > 0 ? (
              ministers.map((minister) => (
                <div
                  key={minister._id}
                  className="p-4 rounded-lg bg-[#f5f0e1] shadow-lg text-black"
                >
                  {/* Minister's Name */}
                  <h2 className="text-xl font-bold mb-2 text-blue-900">
                    {minister.title} {minister.firstname} {minister.lastname}
                  </h2>
                  {/* Minister's Bio */}
                  <p className="text-gray-700 mb-2">{minister.bio}</p>
                  {/* Minister's State */}
                  <p className="text-sm text-gray-500">State: {minister.state}</p>

                  {/* Email Icon */}
                  <div className="mt-4">
                    <a
                      href={`mailto:${minister.email}?subject=Contact from your ministry website`}
                      className="flex items-center text-blue-900 hover:text-blue-600"
                    >
                      <FaEnvelope className="mr-2" />
                      {minister.email}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">Loading ministers...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land4;
