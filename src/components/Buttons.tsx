import React from 'react';

interface ButtonsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  disableDecrement: boolean;
}

const Buttons: React.FC<ButtonsProps> = ({ onIncrement, onDecrement, onReset, disableDecrement }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={onIncrement}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Increase +1
      </button>
      <button
        onClick={onDecrement}
        disabled={disableDecrement}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${disableDecrement ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Decrease -1
      </button>
      <button
        onClick={onReset}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Reset
      </button>
    </div>
  );
};

export default Buttons;
