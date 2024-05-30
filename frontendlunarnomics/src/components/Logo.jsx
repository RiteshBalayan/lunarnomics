import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Logo = () => {
  return (
    <Link to="/" className='mt-10'>
      <img src="/Logo.png" alt="Logo" />
    </Link>
  );
};

export default Logo;
