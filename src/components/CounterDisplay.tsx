// CounterDisplay.tsx
import React from 'react';

interface CounterDisplayProps {
  count: number;
  errorMessage: string | null;
  backgroundColor: string; // Add background color prop
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ count, errorMessage, backgroundColor }) => {
  return (
    <div style={{ backgroundColor: backgroundColor, padding: '10px', border: '1px solid #ccc' }}>
      <h2>Count: {count}</h2>
      {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
    </div>
  );
};

export default CounterDisplay;
