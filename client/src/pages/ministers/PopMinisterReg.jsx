import React from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../../assets/user.png";
import backgroundImage from "../../assets/religion/edited.png"; 

const PopMinisterReg= () => {
  const navigate = useNavigate();

  // Handlers for buttons
  const handleNextPage = () => {
    navigate("/next-page");
  };

  const handlePrevPage = () => {
    navigate("/previous-page");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Apply background image here
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white rounded-lg p-6 w-96 md:w-[50%] text-center shadow-lg animate-fadeIn">
        <img
          src={user}
          alt="More Info"
          className="w-12 h-12 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Become a Minister of God?</h2>
        <p className="text-gray-600 mb-4">
         please read through our agrrement of policy so as to understand our model
        </p>

        <div className="flex justify-around">
          <Link to='/policy'>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            onClick={handleNextPage}
          >
            Policy
          </button>
          </Link>

          {/* <Link to='/choice'>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
            onClick={handlePrevPage}
          >
            Cancel
          </button>
          </Link> */}
        
      
        </div>
      </div>
    </div>
  );
};

export default PopMinisterReg;
