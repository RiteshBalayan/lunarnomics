import React, { useState, useEffect } from 'react';
import './AnimatedClock.css'; // Import the custom CSS file for Google Fonts

const AnimatedNumber = ({ targetNumber }) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const duration = 1000; // Animation duration in milliseconds
    const steps = 50; // Number of steps for animation

    const increment = targetNumber / steps;
    const stepDuration = duration / steps;

    let currentNumber = 0;
    const timer = setInterval(() => {
      currentNumber += increment;
      setNumber(Math.floor(currentNumber));

      if (currentNumber >= targetNumber) {
        clearInterval(timer);
        setNumber(targetNumber);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetNumber]);

  return (
    <div className="font-orbitron text-5xl text-center">{number}</div>
  );
};

export default AnimatedNumber;
