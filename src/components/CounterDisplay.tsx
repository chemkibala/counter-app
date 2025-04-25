import React from 'react';

interface CounterDisplayProps {
  count: number;
  errorMessage: string | null;
  backgroundColor: string;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ count, errorMessage, backgroundColor }) => {
  return (
    <div className={`p-4 border border-gray-300 ${backgroundColor}`}>
      <h2 className="text-2xl font-bold">Count: {count}</h2>
      {errorMessage && <p className="text-red-500 mt-2">Error: {errorMessage}</p>}
    </div>
  );
};

export default CounterDisplay;
