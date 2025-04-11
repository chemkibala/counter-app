import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CounterDisplay from './components/CounterDisplay';
import Buttons from './components/Buttons';
import ToDo from './components/ToDo';
import Home from './components/Home';
import './index.css';
import NavBar from './components/NavBar';
import TodoProvider from './contexts/TodoContext';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
 
  const getBackgroundColor = (count: number): string => {
    enum BackgroundColor {
      Red = 'bg-red-500',
      Orange = 'bg-orange-500',
      Yellow = 'bg-yellow-500',
      White = 'bg-white',
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
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
      setErrorMessage(null); 
    } else {
      setErrorMessage('Cannot decrement below 0.'); 
    }
  };

  const handleReset = () => {
    setCount(0);
    setErrorMessage(null);
    setBackgroundColor('bg-white');
  };

  return (
    <Router>
      <div className="container mx-auto">
        <div className="flex items-center justify-between bg-gray-100 py-1 mb-4">
          <div className="w-1/3"></div>
          <h1 className="text-4xl font-bold text-center text-blue-900 w-1/3">Counter App</h1>
          <div className="w-1/3">
            <NavBar />
          </div>
        </div>

        <TodoProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={
              <>
                <CounterDisplay count={count} errorMessage={errorMessage} backgroundColor={backgroundColor} />
                <Buttons
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onReset={handleReset}
                  disableDecrement={count === 0 && errorMessage !== null}
                />
              </>
            } />
            <Route path="/todo" element={<ToDo />} />
          </Routes>
        </TodoProvider>
      </div>
    </Router>
  );
};

export default App;
