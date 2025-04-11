import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-left justify-center h-full">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to the Home Page!</h2>
      <p className="text-lg text-gray-700">This is the main page of our application.</p>
    </div>
  );
};

export default Home;
