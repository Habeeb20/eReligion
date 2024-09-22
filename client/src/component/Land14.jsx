import React, { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import Land5 from './Land5';

const Land14 = () => {
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
    <div className="min-h-screen text-white px-11 py-2">
      <h1 className="text-center text-3xl font-bold mb-6"> {/* Reduced mb-6 from mb-10 */}
        Quick Connect to the servants of God
      </h1>

      {/* Minister Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ministers.length > 0 ? (
            ministers.map((minister) => (
              <div
                key={minister._id}
                className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Minister's Name */}
                <h2 className="text-xl font-bold text-blue-900 mb-2">
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
            <p className="text-center col-span-full">Loading ministers...</p>
          )}
        </div>
      </div>

      {/* Content that comes below the grid */}
      <div className="mt-4"> {/* Adjust margin-top (mt) to control spacing */}
        <Land5 />
      </div>
    </div>
  );
};

export default Land14;
