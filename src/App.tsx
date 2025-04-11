import React, { useState, useEffect } from 'react';
import CounterDisplay from './components/CounterDisplay';
import Buttons from './components/Buttons';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [disableDecrement, setDisableDecrement] = useState(false); // New state for disabling

  const getBackgroundColor = (count: number): string => {
    enum BackgroundColor {
      Red = 'red',
      Orange = 'orange',
      Yellow = 'yellow',
      White = 'white',
    }

    switch (true) {
      case count >= 15:
      return BackgroundColor.Red;
      case count >= 10:
      return BackgroundColor.Orange;
      case count >= 5:
      return BackgroundColor.Yellow;
      default:
      return BackgroundColor.White;
    }
  };

  useEffect(() => {
    const newBackgroundColor = getBackgroundColor(count);
    setBackgroundColor(newBackgroundColor);
  }, [count]);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
    setErrorMessage(null);
    setDisableDecrement(false); // Re-enable decrement when incrementing
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
      setErrorMessage(null);
      setDisableDecrement(false);  // Re-enable decrement when successful
    } else {
      setErrorMessage('Cannot decrement below 0.');
      setDisableDecrement(true); // Disable decrement only on error
    }
  };

  const handleReset = () => {
    setCount(0);
    setErrorMessage(null);
    setBackgroundColor('white');
    setDisableDecrement(false); // Re-enable on reset
  };

  return (
    <div>
      <h1>Counter App</h1>
      <CounterDisplay count={count} errorMessage={errorMessage} backgroundColor={backgroundColor} />
      <Buttons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={handleReset}
        disableDecrement={disableDecrement}
      />
    </div>
  );
};

export default App;