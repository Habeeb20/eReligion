// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Result() {
  const [ministers, setMinisters] = useState([]);
  const [filteredMinisters, setFilteredMinisters] = useState([]);
  const [filters, setFilters] = useState({
    religion: '',
    state: '',
    localgovt: '',
  });
  const [searchMessage, setSearchMessage] = useState('');

  useEffect(() => {
    // Fetch ministers from the backend API
    axios.get('http://localhost:9000/api/minister/ministers')
      .then(response => {
        setMinisters(response.data);
        setFilteredMinisters(response.data);
      })
      .catch(error => {
        console.error('Error fetching ministers:', error);
      });
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Search for ministers based on filters
  const handleSearch = () => {
    const { religion, state, localgovt } = filters;
    const filtered = ministers.filter(minister => 
      minister.religion.toLowerCase().includes(religion.toLowerCase()) &&
      minister.state.toLowerCase().includes(state.toLowerCase()) &&
      minister.localgovt.toLowerCase().includes(localgovt.toLowerCase())
    );
    
    if (filtered.length > 0) {
      setFilteredMinisters(filtered);
      setSearchMessage('');
    } else {
      setFilteredMinisters([]);
      setSearchMessage('No religion in the selected state');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">3,496 Results in Lagos</h1>

      {/* Search filters */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            name="religion"
            placeholder="Religion"
            value={filters.religion}
            onChange={handleFilterChange}
            className="border rounded p-2 w-1/3"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={filters.state}
            onChange={handleFilterChange}
            className="border rounded p-2 w-1/3"
          />
          <input
            type="text"
            name="localgovt"
            placeholder="Local Govt"
            value={filters.localgovt}
            onChange={handleFilterChange}
            className="border rounded p-2 w-1/3"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchMessage ? (
          <div className="col-span-4 text-center text-red-500">{searchMessage}</div>
        ) : (
          filteredMinisters.map((minister, index) => (
            <div key={index} className="p-4 border rounded-lg shadow">
              <div className="flex items-center mb-2">
                <img
                  src="https://via.placeholder.com/50"
                  alt={minister.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-bold text-lg">{minister.name}</h3>
                  <p className="text-sm text-gray-600">{minister.church}</p>
                </div>
              </div>
              <p className="text-sm mb-2">{minister.description}</p>
              <span className="text-xs bg-gray-200 rounded-full px-2 py-1">{minister.responseTime}</span>
            </div>
          ))
        )}
      </div>

      {/* Categories buttons */}
      <div className="mt-6 flex flex-wrap space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Our Top Picks</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">5000 Members</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Regular Ministries</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Best Reviews</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Most Popular</button>
      </div>

      {/* Price Filter */}
      <div className="mt-4 flex flex-wrap space-x-2">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cheap Results in Ikeja</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cheap Results in Lekki</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cheap Results in Victoria Island</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cheap Results in Ikoyi</button>
      </div>
    </div>
  );
}

export default Result;
