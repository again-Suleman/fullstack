// src/components/Spinner.js

import React from 'react';
import './style.css';

const Loader = ({ centered }) => {
  return (
    <div className={`spinner center`}>
      {[...Array(12)].map((_, index) => (
        <div key={index} className="spinner-blade"></div>
      ))}
    </div>
  );
};

export default Loader;
