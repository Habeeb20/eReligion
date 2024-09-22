// import React from 'react';
// import im1 from '../assets/religion/Rectangle 1.png'
// import im2 from '../assets/religion/Rectangle 2.png'
// const Land13 = () => {
//   return (
//     <div className="bg-[#f5f0e1] min-h-screen">
//       {/* Header Section */}
//       <div className="relative">
//         {/* Background and overlay */}
//         <div className="absolute inset-0 bg-cover bg-center opacity-70 bg-[url('/your-image.jpg')]"></div>
//         <div className="relative z-10 text-center pt-16 px-4 md:px-16">
//           <h1 className="text-3xl md:text-5xl font-bold text-[#1f1f7a]">
//             Find, worship and Book with Ministries in Nigeria
//           </h1>
//           <p className="text-sm md:text-lg mt-4 text-[#1f1f7a]">
//             Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God
//           </p>

//           {/* Search Bar */}
//           <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
//             <input
//               type="text"
//               placeholder="Religion e.g christian, muslim"
//               className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
//             />
//             <input
//               type="text"
//               placeholder="Location e.g Lagos, Abuja"
//               className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
//             />
//             <button className="p-3 bg-indigo-900 text-white rounded-lg w-full md:w-auto">
//               Search
//             </button>
//           </div>

//           {/* Images */}
//           <div className="flex flex-col md:flex-row justify-center items-center mt-12 space-y-4 md:space-y-0 md:space-x-8">
//             <div className="flex justify-center">
//               <img
//                 src={im2}
//                 alt="Worship Image"
//                 className="rounded-lg shadow-lg"
//                 style={{
//                   width: '150px',
//                   height: 'auto',
//                   border: '3px dashed orange',
//                 }}
//               />
//             </div>
//             <div className="flex justify-center">
//               <img
//                 src={im1}
//                 alt="Minister Image"
//                 className="rounded-full shadow-lg"
//                 style={{
//                   width: '150px',
//                   height: 'auto',
//                   border: '3px dashed yellow',
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Suggested Destinations */}
//       <div className="mt-12 text-center px-4">
//         <h2 className="text-lg font-semibold mb-4">Suggested Destinations in Nigeria</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button className="bg-indigo-900 text-white py-2 rounded-lg">Religious leaders in Lagos</button>
//           <button className="bg-indigo-900 text-white py-2 rounded-lg">Religious leaders in Abuja</button>
//           <button className="bg-indigo-900 text-white py-2 rounded-lg">Religious leaders in Enugu</button>
//           <button className="bg-indigo-900 text-white py-2 rounded-lg">Religious leaders in Ibadan</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Land13;




import React, { useState, useEffect } from 'react';
import im1 from '../assets/religion/Rectangle 1.png';
import im2 from '../assets/religion/Rectangle 2.png';
import useravatar from '../assets/user.png'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
const Land13 = () => {
  const [religion, setReligion] = useState('');
  const [location, setLocation] = useState('');
  const [ministers, setMinisters] = useState([]);
  const [filteredLgas, setFilteredLgas] = useState([]);
  const [selectedLga, setSelectedLga] = useState('');
  const [leadersInLga, setLeadersInLga] = useState([]);

  const navigate = useNavigate()
  // Fetch ministers data from API
  useEffect(() => {
    fetch('http://localhost:9000/api/minister/ministers')
      .then((res) => res.json())
      .then((data) => {
        setMinisters(data); // Save fetched data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle search and filter ministers based on religion and location
  const handleSearch = () => {
    const filtered = ministers.filter(
      (minister) =>
        minister.religion.toLowerCase().includes(religion.toLowerCase()) &&
        minister.state.toLowerCase().includes(location.toLowerCase())
    );

    const uniqueLgas = [...new Set(filtered.map((minister) => minister.localGovtArea))]; // Get unique LGAs
    setFilteredLgas(uniqueLgas); // Set LGAs for button generation
    setSelectedLga(''); // Clear any previously selected LGA
    setLeadersInLga([]); // Clear previous LGA leader details
  };

  // Handle LGA button click
  const handleLgaClick = (lga) => {
    setSelectedLga(lga);
    const leaders = ministers.filter((minister) => minister.localGovtArea === lga); // Get leaders in the selected LGA
    setLeadersInLga(leaders);
  };
  

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
              placeholder="Religion e.g christian, muslim"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
            />
            <input
              type="text"
              placeholder="Location e.g Lagos, Abuja"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
            />
            <button
              onClick={handleSearch}
              className="p-3 bg-indigo-900 text-white rounded-lg w-full md:w-auto"
            >
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
          {filteredLgas.length > 0 ? (
            filteredLgas.map((lga, index) => (
              <button
                key={index}
                className="bg-indigo-900 text-white py-2 rounded-lg"
                onClick={() => handleLgaClick(lga)}
              >
                Religious leaders in {lga}
              </button>
            ))
          ) : (
            <p className='text-center justify-content: center text-align: center'>No destinations found. Please search for religion and location.</p>
          )}
        </div>
      </div>

      {/* Leaders in Selected LGA */}
      {selectedLga && (
      

        // Inside your LeadersPage component
        <div className="mt-12 text-center px-4">
          <h2 className="text-lg font-semibold mb-4">
            Religious Leaders in {selectedLga}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leadersInLga.map((leader, index) => (
              <div
                key={index}
                className="p-4 rounded-lg shadow-lg bg-[#f5f0e1] text-left relative"
                style={{
                  border: '1px solid #e2e2e2',
                  backgroundColor: '#faf5e5',
                }}
              >
                {/* Response Time Badge */}
                <div className="absolute top-2 right-2 bg-[#E5E6E9] text-gray-600 text-xs px-2 py-1 rounded-full">
                  20mins response time
                </div>
        
                {/* Leader Image */}
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src={useravatar || '/path-to-default-avatar.jpg'}
                    alt={`${leader.firstname} ${leader.lastname}`}
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <div>
                    {/* Leader Name */}
                    <h3 className="font-bold text-[#1f1f7a] px-5">
                      {leader.title} {leader.firstname} {leader.lastname}
                    </h3>
                    {/* Ministry Name */}
                    <p className="text-sm text-gray-500 flex items-center space-x-1">
                      <span role="img" aria-label="church">
                        ⛪
                      </span>
                      <span>{leader.ministryName}</span>
                    </p>
                  </div>
                </div>
        
                {/* Leader Bio */}
                <div className="text-sm text-gray-600 mt-2">
                  <p>{leader.bio}</p>
                </div>
        
                {/* Religion & Location */}
                <div className="mt-2 text-sm text-gray-700">
                  <p className="flex items-center space-x-1">
                    <span>{leader.religion}</span>
                  </p>
                  <p>
                    {leader.localGovtArea}, {leader.state}
                  </p>
                </div>
        
                {/* Contact Details */}
                <div className="mt-2 text-sm">
                  <p>{leader.email}</p>
                  <p>{leader.phone}</p>
                </div>
        
                {/* View Profile Button */}
                <div className="mt-4">
                  <Link to={`/minister/${leader._id}`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      
      )}
    </div>
  );
};

export default Land13;
