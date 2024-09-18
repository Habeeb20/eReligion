import React from "react";

const Religion3 = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <img
            src="https://via.placeholder.com/1200x400"
            alt="Student Discount"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold text-indigo-800">
              Students Wooping Discount
            </h1>
            <p className="text-gray-600 mt-2">
              Travel to anywhere in the world at the best discount possible by being a student
            </p>
            <button className="bg-indigo-600 text-white px-6 py-2 mt-4 rounded-md hover:bg-indigo-700">
              Book now
            </button>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Traditional</h2>
          <p className="text-gray-600 mb-6">
            Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God...
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>100000 ministers worldwide from the comfort of your home</li>
            <li>Meet with genuine Men of God worldwide</li>
            <li>Comfort of your home and meet with Men of God</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Minister 1"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="https://via.placeholder.com/400x300"
              alt="Minister 2"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="https://via.placeholder.com/400x300"
              alt="Minister 3"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Icons Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Icons in this religion</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Icon 1 */}
            <div className="bg-gray-100 rounded-lg p-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Icon 1"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">Pst. James Johnson</h3>
              <p className="text-sm text-gray-600">Body of Christ Church</p>
            </div>
            {/* Icon 2 */}
            <div className="bg-gray-100 rounded-lg p-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Icon 2"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">Pst. James Johnson</h3>
              <p className="text-sm text-gray-600">Body of Christ Church</p>
            </div>
            {/* Icon 3 */}
            <div className="bg-gray-100 rounded-lg p-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Icon 3"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">Pst. James Johnson</h3>
              <p className="text-sm text-gray-600">Body of Christ Church</p>
            </div>
            {/* Icon 4 */}
            <div className="bg-gray-100 rounded-lg p-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Icon 4"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">Pst. James Johnson</h3>
              <p className="text-sm text-gray-600">Body of Christ Church</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Religion3;
