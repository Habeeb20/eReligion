import React from 'react';
// import im from '../assets/religion/Ellipse 3.png';
import im1 from '../assets/religion/image (1).png';
import im2 from '../assets/religion/image (2).png';
import im3 from '../assets/religion/image (3).png';
import im from '../assets/religion/Container (1).png'

const ministers = [
  {
    name: 'Pst. James Johnson',
    church: 'Body of Christ Church',
    responseTime: '20mins response time',
    description: 'I am a pastor from humble beginning I am a pastor from humble beginning...',
    image: im // Direct assignment of the image
  },
  {
    name: 'Pst. James Johnson',
    church: 'Body of Christ Church',
    responseTime: '20mins response time',
    description: 'I am a pastor from humble beginning I am a pastor from humble beginning...',
    image: im2 // Direct assignment of the image
  },
  {
    name: 'Pst. James Johnson',
    church: 'Body of Christ Church',
    responseTime: '20mins response time',
    description: 'I am a pastor from humble beginning I am a pastor from humble beginning...',
    image: im3 // Direct assignment of the image
  },
  {
    name: 'Pst. James Johnson',
    church: 'Body of Christ Church',
    responseTime: '20mins response time',
    description: 'I am a pastor from humble beginning I am a pastor from humble beginning...',
    image: im
  },
  {
    name: 'Pst. James Johnson',
    church: 'Body of Christ Church',
    responseTime: '20mins response time',
    description: 'I am a pastor from humble beginning I am a pastor from humble beginning...',
    image: im2
  },
  {
    name: 'Pst. James Johnson',
    church: 'Body of Christ Church',
    responseTime: '20mins response time',
    description: 'I am a pastor from humble beginning I am a pastor from humble beginning...',
    image: im3
  },
];

const MinisterCard = ({ minister }) => {
  return (
    <div className="border rounded-md p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      <div className="flex items-center mb-4">
        <img
          src= {im }
          alt={minister.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{minister.name}</h2>
          <p className="text-gray-500">{minister.church}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{minister.description}</p>
      <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
        {minister.responseTime}
      </span>
    </div>
  );
};

const Land5 = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          QUICKLY CONNECT
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Connect with Servants of God on a click
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Related around you</h2>
        <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
          <span className="bg-red-500 w-4 h-4 rounded-full inline-block mr-2"></span>
          <span className="text-gray-700">Lagos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {ministers.map((minister, index) => (
          <MinisterCard key={index} minister={minister} />
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Related around you</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {ministers.map((minister, index) => (
          <MinisterCard key={index} minister={minister} />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Churches around you</h2>
      </div>
    </div>
  );
};

export default Land5;
