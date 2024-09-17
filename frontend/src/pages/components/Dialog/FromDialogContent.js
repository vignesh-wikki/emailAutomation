import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function FormDialogContent({ onRequestClose, onEmailChange, onNameChange }) {
  const [email, setEmail] = useState();
  const [name, setName] = useState();

   useEffect(() => {
     if (email && name) {
       // Save data to a storage solution of your choice (localStorage, etc.)
       localStorage.setItem("email", JSON.stringify(email));
       localStorage.setItem("name", JSON.stringify(name));
     }
   }, [email,name]);

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');

  const handleCancel = () => {
    onRequestClose();
  };

  const handleEmailChangeLocal = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    onEmailChange(newEmail);
    validateEmail(newEmail);
  };

  const handleNameChangeLocal = (e) => {
    const newName = e.target.value;
    setName(newName);
    onNameChange(newName);
    validateName(newName);
  };

  const validateEmail = (email) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isValidEmail ? '' : 'Please enter a valid email address.');
  };

  const validateName = (name) => {
    setNameError(name.trim() !== '' ? '' : 'Please enter your name.');
  };

  const handleSubmit = () => {
    validateEmail(email);
    validateName(name);
  
    if (emailError === '' && nameError === '' && email.trim() !== '' && name.trim() !== '') {
      console.log('Email:', email);
      console.log('Name:', name);
  
      // Close the form after successful validation
      onRequestClose();
    }
  };
  
  

  return (
    <div className="flex flex-col  overflow-y-auto">
      <h2 className="text-xl p-7 font-medium">Form :</h2>
      <div className="pl-7 mt-[-1rem]">
        <label className="block text-lg font-medium mb-2" htmlFor="email">
          Email address
        </label>
        <input
          type="email"
          id="email-address"
          onChange={handleEmailChangeLocal}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 block w-[65%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
      </div>

      <div className="pl-7 mt-[1rem]">
        <label className="block text-lg font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          onChange={handleNameChangeLocal}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 block w-[65%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {nameError && <p className="text-red-500">{nameError}</p>}
      </div>

      <div className="pl-10 md:ml-[18rem] mt-4 mb-3  flex justify-between">
        <Link className="flex text-[#004DE3] me-9 items-center" onClick={handleCancel}>
          Cancel
        </Link>
        <button
          className="bg-[#0C2136] me-5 text-white p-1 rounded-md w-32 text-base"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default FormDialogContent;