import React, { useState, useEffect } from 'react';
import './AnimatedClock.css'; // Import the custom CSS file for Google Fonts

const AnimatedNumber = ({ targetNumber }) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const duration = 2000; // Animation duration in milliseconds
    const steps = 200; // Number of steps for animation

    const increment = targetNumber / steps;
    const stepDuration = duration / steps;

    let currentNumber = 0;
    const timer = setInterval(() => {
      currentNumber += increment;
      const formattedNumber = Math.floor(currentNumber).toString().padStart(targetNumber.toString().length, '0');
      setNumber(formattedNumber);

      if (currentNumber >= targetNumber) {
        clearInterval(timer);
        setNumber(targetNumber.toString().padStart(targetNumber.toString().length, '0'));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetNumber]);

  return (
    <div className="font-orbitron text-3xl">{number}</div>
  );
};

export default AnimatedNumber;
