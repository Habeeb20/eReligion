import React from 'react';
import im from '../assets/religion/Rectangle 4.png'
import im1 from '../assets/religion/Rectangle 5.png'
import im2 from '../assets/religion/Rectangle 6.png'
import im3 from '../assets/religion/Rectangle 7.png'
import im4 from '../assets/religion/Rectangle 8.png'
import im5 from '../assets/religion/Rectangle 9.png'
const Land2 = () => {
  return (
    <div className="bg-[#FAF3DD] p-4">
      {/* Top religious Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {[
          { city: 'Lagos', ministers: 3496 },
          { city: 'Abuja', ministers: 1189 },
          { city: 'Port Harcourt', ministers: 424 },
          { city: 'Kaduna', ministers: 326 },
          { city: 'Uyo', ministers: -207 },
          { city: 'Ibadan', ministers: 493 },
        ].map((hotel, index) => (
          <div key={index} className="border-2 border-[#0A0344] rounded-md text-center p-4 w-44">
            <h3 className="text-[#0A0344] font-semibold">{`Religious leaders in ${hotel.city}`}</h3>
            <p className="text-[#6D6D6D]">{hotel.ministers} Ministers</p>
          </div>
        ))}
      </div>

      {/* Image Grid Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {[
          im,
          im1,
          im2,
          im3,
          im4,
        ].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`religious-img-${index}`}
            className="w-36 h-36 object-cover rounded-md"
          />
        ))}
      </div>

      {/* Religious Stats Section */}
      <div className="flex flex-col items-center justify-center text-center mb-6">
      <div className="flex flex-col items-center justify-center text-center mb-6 px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-4">
    <div className="flex flex-col items-center">
      <p className="text-xl sm:text-2xl font-bold text-[#0A0344]">
        3M+<br />
        <span className="text-xs sm:text-sm font-light">Religious Ministers of God</span>
      </p>
    </div>
    <div className="flex flex-col items-center">
      <p className="text-xl sm:text-2xl font-bold text-[#0A0344]">
        3000<br />
        <span className="text-xs sm:text-sm font-light">Christian Denominations</span>
      </p>
    </div>
    <div className="flex flex-col items-center">
      <p className="text-xl sm:text-2xl font-bold text-[#0A0344]">
        3000<br />
        <span className="text-xs sm:text-sm font-light">Islamic Communities</span>
      </p>
    </div>
    <div className="flex flex-col items-center">
      <p className="text-xl sm:text-2xl font-bold text-[#0A0344]">
        3000<br />
        <span className="text-xs sm:text-sm font-light">Traditional followers</span>
      </p>
    </div>
  </div>
</div>

        <div className="mb-4">
          <img
            src={im5}
            alt="religion-icons"
            className="w-48 h-32 object-cover rounded-md"
          />
        </div>
        <p className="text-lg text-[#6D6D6D]">
          e-religion is your search engine for anything and everything religion. 
          As of today, we have <span className="font-bold">74,952,662</span> users worldwide. No annoying ads, no download limits.
        </p>
        <button className="bg-[#0A0344] text-white py-2 px-4 mt-4 rounded-md">Report a scam</button>
      </div>
    </div>
  );
};

export default Land2;
