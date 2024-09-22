import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moreInfoImage from '../../assets/user.png'; // Ensure this path is correct

const PopupNotification = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handlePolicyRedirect = () => {
    navigate('/login'); // Ensure that this route exists in your router setup
  };

  return (
    <div>
      <button onClick={openPopup} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Show Notification
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2 lg:w-1/3 relative">
            {/* Close button with aria-label for accessibility */}
            <button 
              onClick={closePopup} 
              className="absolute top-2 right-2 text-gray-500"
              aria-label="Close Popup"
            >
              &times;
            </button>

            <div className="text-center">
              {/* Display the image */}
              <img src={moreInfoImage} alt="More Info" className="mx-auto mb-4 w-20 h-20" />
              
              {/* Popup content */}
              <h2 className="text-xl font-semibold text-blue-900">Become a Minister</h2>
              <p className="text-gray-600 mt-2 mb-6">
                Read through our agreement and policy to understand our model.
              </p>
              
              {/* Redirect button */}
              <button onClick={handlePolicyRedirect} className="bg-blue-900 text-white px-8 py-3 rounded-lg">
                Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupNotification;
