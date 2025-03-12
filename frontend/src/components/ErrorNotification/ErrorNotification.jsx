
import React, { useEffect } from 'react';
import './ErrorNotification.css';

const ErrorNotification = ({ message, setError }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message, setError]);

  if (!message) return null;

  return (
    <div className="error-notification">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <p>{message}</p>
        <button className="close-btn" onClick={() => setError('')}>×</button>
      </div>
    </div>
  );
};

export default ErrorNotification;
