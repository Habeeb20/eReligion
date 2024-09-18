// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const AllMinister = () => {
//   const [ministers, setMinisters] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMinisters = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/minister/ministers`);
        
//         if (Array.isArray(res.data)) {
//           setMinisters(res.data);
//         } else {
//           console.error('Unexpected API response:', res.data);
//           setError('Failed to load ministers. Please try again later.');
//         }
//       } catch (err) {
//         console.error('Error fetching ministers:', err);
//         setError('Failed to fetch ministers. Please try again later.');
//         toast.error('Failed to fetch ministers.');
//       }
//     };

//     fetchMinisters();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">List of Ministers</h1>

//       {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {ministers.length > 0 ? (
//           ministers.map(minister => (
//             <div key={minister._id} className="border p-4 rounded shadow">
//               <h2 className="text-xl font-semibold">
//                 {minister.title} {minister.firstname} {minister.lastname}
//               </h2>
//               <p>{minister.ministryname}</p>
//               {/* <Link to={`/minister/${minister._id}`} className="text-blue-500">View Profile</Link> */}
//               <Link to='/appointment' className="text-blue-500">Book an Appointment</Link>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No ministers available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllMinister;






import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AllMinister = () => {
  const [ministers, setMinisters] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinisters = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/minister/ministers`);
        if (Array.isArray(res.data)) {
          setMinisters(res.data);
        } else {
          console.error('Unexpected API response:', res.data);
          setError('Failed to load ministers. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching ministers:', err);
        setError('Failed to fetch ministers. Please try again later.');
        toast.error('Failed to fetch ministers.');
      } finally {
        setLoading(false);
      }
    };

    fetchMinisters();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List of Ministers</h1>

      {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

      {loading ? (
        <p className="text-center">Loading ministers...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministers.length > 0 ? (
            ministers.map(minister => (
              <div key={minister._id} className="border p-4 rounded shadow">
                <h5 className="text-base font-semibold">
                  {minister.title} {minister.firstname} {minister.lastname} <br /> {minister.email}
                </h5>
                <p>{minister.ministryname}</p>
                <Link to={`/minister/${minister._id}/appointment`} className="text-blue-500">Book an Appointment</Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No ministers available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllMinister;
