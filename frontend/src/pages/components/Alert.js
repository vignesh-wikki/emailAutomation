import React from 'react';

const Alert = ({ message, isAlertVisible }) => (
  <div
    className={`fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded shadow-md ${
      isAlertVisible ? 'block' : 'hidden'
    }`}
  >
    {message}
  </div>
);

export default Alert;
