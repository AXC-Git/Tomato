
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  const spinnerClasses = `spinner spinner-${size} spinner-${color}`;
  
  return (
    <div className="spinner-container">
      <div className={spinnerClasses}></div>
    </div>
  );
};

export default LoadingSpinner;
