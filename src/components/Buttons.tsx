import React from 'react';

interface ButtonsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  disableDecrement: boolean; // Add disableDecrement prop
}

const Buttons: React.FC<ButtonsProps> = ({ onIncrement, onDecrement, onReset, disableDecrement }) => {
  return (
    <div>
      <button onClick={onIncrement}>Increase +1</button>
      <button onClick={onDecrement} disabled={disableDecrement}> {/* Disable based on prop */}
        Decrease -1
      </button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default Buttons;
