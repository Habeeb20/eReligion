import React from 'react';

const Ministers = [
  {
    name: "Pst. James Johnson",
    church: "Body of Christ Church",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    name: "Pst. James Johnson",
    church: "Body of Christ Church",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Pst. James Johnson",
    church: "Body of Christ Church",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Pst. James Johnson",
    church: "Body of Christ Church",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const ReligionSection = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-8">
    <h2 className="text-xl font-bold mb-4 text-blue-800">{title}</h2>
    <p className="text-gray-700 mb-6">{description}</p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-200 h-32"></div>
      <div className="bg-gray-200 h-32"></div>
      <div className="bg-gray-200 h-32"></div>
    </div>
    <h3 className="text-lg font-semibold mb-4">Icons in this religion</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Ministers.map((minister, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <img
            src={minister.imageUrl}
            alt={minister.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h4 className="font-bold text-gray-800 text-center">{minister.name}</h4>
          <p className="text-sm text-center text-gray-600">{minister.church}</p>
        </div>
      ))}
    </div>
  </div>
);

const Religion2 = () => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-8">
    <h3 className="text-lg font-semibold mb-4">Icons in this religion</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Ministers.map((minister, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <img
            src={minister.imageUrl}
            alt={minister.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h4 className="font-bold text-gray-800 text-center">{minister.name}</h4>
          <p className="text-sm text-center text-gray-600">{minister.church}</p>
        </div>
      ))}
    </div>
    <button className="bg-indigo-600 text-white py-2 px-6 rounded-md mt-4 block mx-auto hover:bg-indigo-500">
      Contact a Christian Minister
    </button>
  </div>
);

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      {/* Minister Section */}
      <MinisterSection />

      {/* Muslim Section */}
      <ReligionSection
        title="Muslim"
        description="Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God."
      />
    </div>
  );
};

export default Religion2;
