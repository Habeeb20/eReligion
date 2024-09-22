// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from 'react-router-dom';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen">
        <button
          onClick={openPopup}
          className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Open Popup
        </button>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={closePopup}
              >
                ✕
              </button>
              <div className="flex justify-center items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">i</span>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">Become a Minister</h2>
              <p className="text-center text-gray-600 mb-4">
                Read through our agreement and policy to understand our model
              </p>
              <Link
                to="/policy"
                className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Policy
              </Link>
            </div>
          </div>
        )}

        <Switch>
          <Route path="/policy" component={PolicyPage} />
          <Route path="/form" component={FormPage} />
        </Switch>
      </div>
    </Router>
  );
}

function PolicyPage() {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/form');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-2/3">
        <h2 className="text-2xl font-semibold text-center mb-4">Policy Agreement</h2>
        <p className="text-gray-600 mb-8">
          Here you would include the write-up about the policy and agreement for becoming a minister.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <input type="radio" className="mr-2" required /> I agree to the terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function FormPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-2/3">
        <h2 className="text-2xl font-semibold text-center mb-4">Form Page</h2>
        <p className="text-gray-600 mb-8">Here you can include further details or forms as required.</p>
        {/* Add more form fields or content as per your needs */}
      </div>
    </div>
  );
}

export default App;
