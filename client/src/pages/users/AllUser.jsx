import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllUser = () => {
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`);
                
                setUsers(response.data);  // Use response.data directly
                toast.success("Users fetched successfully");
            } catch (error) {
                console.log(error);
                setError("An error occurred");
                toast.error("Failed to fetch users");
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}
            {users.length === 0 ? (
                <p className="text-center text-gray-500">No users found.</p>
            ) : (
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{user.firstName}</h3>
                                <p className="text-gray-600">Email: {user.email}</p>
                                <p className="text-gray-600">Country: {user.country}</p>
                                <p className="text-gray-600">Address: {user.address}</p>
                            </div>
                            <button
                                className="mt-4 md:mt-0 md:ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                onClick={() => console.log(`User ID: ${user.id}`)}
                            >
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AllUser;
