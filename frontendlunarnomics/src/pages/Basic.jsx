import React from 'react';
import './Basic.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="banner-wrapper">
        <div className="banner first">
            <h1>First Block </h1>
        </div>
        <div className="banner big">
            <h1>Middle Block</h1>         
        </div>
        <div className="banner last">
            <h1>Third Block </h1>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
