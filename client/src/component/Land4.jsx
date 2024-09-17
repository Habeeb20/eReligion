import React from 'react';
import im from "../assets/religion/sc.png"
import im1 from "../assets/religion/sc1.png"
import im2 from "../assets/religion/sc3.png"
const Land4 = () => {
  return (
    <div className="bg-blue-900 text-white min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-2xl font-bold text-white leading-tight mb-4">
            Serve God Anywhere in the world <br /> and avoid <span className="text-white">SCAMMERS</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God.
            Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God.
          </p>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-400">
            Report a scam
          </button>
        </div>

        {/* Right Content (Images) */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={im}
              alt="Image 1"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src={im1}
              alt="Image 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 right-0 transform translate-x-6 translate-y-6">
            <img
              src={im2}
              alt="Image 3"
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land4;
