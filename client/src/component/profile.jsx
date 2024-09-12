import React from 'react'
import axios from 'axios'
function profile() {
    const url = process.env.backend_vite_url
    const[general, setGeneral] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        country: '',
        bio: '',
        password: '',
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/users/register`, {general});
            console.log(response.data);

        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
          <div className="max-w-md mx-auto bg-white shadow-md p-5">
      <h2 className="text-2xl font-bold mb-5">User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={general.firstName}
            onChange={(e) => setGeneral({ ...general, firstName: e.target.value })}
          />
        </div>
        {/* Add other fields */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-3"
        >
          Register
        </button>
      </form>
    </div>
      
    </div>
  )
}

export default profile
