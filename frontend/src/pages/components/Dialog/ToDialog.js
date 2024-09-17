import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '../button';
import * as XLSX from 'xlsx';

const ToDialog = ({ onRequestClose, onToEmailChange }) => {
  const [toEmail, setToEmail] = useState('');
  const [fileError, setFileError] = useState('');

   useEffect(() => {
     if (toEmail) {
       // Save data to a storage solution of your choice (localStorage, etc.)
       localStorage.setItem("toEmail", JSON.stringify(toEmail));
       
     }
   }, [toEmail]);
  const handleCancel = () => {
    onRequestClose();
  };

  const handleToEmailChangeLocal = (e) => {
    const email = e.target.value;
    setToEmail(email);
    onToEmailChange(email); 
    setFileError(''); // Clear file error when typing in the "To" address
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const toEmailsFromFile = [];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Extracting emails correctly from the sheet
        const emails = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });

        // Assuming the emails are in the first column ('A')
        const emailColumn = emails.map(row => row[0]);

        toEmailsFromFile.push(...emailColumn);
        console.log('Recipients from file:', toEmailsFromFile.join(', '));

        // Move this line inside the onload callback to ensure it's called after the emails are extracted
        onToEmailChange(toEmailsFromFile.join(', '));
      };

      reader.readAsArrayBuffer(file);
      setFileError('');
    } else {
      setFileError(''); // Clear file error when selecting a file
    }
  };

  const handleSave = () => {
    // Validate email
    if (!toEmail && !fileError) {
      setFileError('Please enter an email address or select a file.');
      return;
    } else {
      setFileError('');
    }

    if (toEmail && !isValidEmail(toEmail)) {
      setFileError('Please enter a valid email address.');
      return;
    } else {
      setFileError('');
    }

    // Additional validations if needed

    // Save logic
    onRequestClose();
  };

  const isValidEmail = (email) => {
    // Use a regular expression to check for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  return (
    <div>
      <h2 className="text-xl p-7 font-medium">To :</h2>
      <div className="pl-7 mt-[-1rem]">
        <label className="block text-lg font-medium mb-2" htmlFor="email">
          Send To
        </label>
        <input
          type="email"
          id="email-address"
          onChange={handleToEmailChangeLocal}
          className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 block w-[60%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className="pl-7 mt-[1rem]">
        <label className="block text-lg font-medium mb-2" htmlFor="name">
          Select List
        </label>
        <input
          type="file"
          name="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          disabled={toEmail.trim() !== ''}
        />
        {fileError && <p className="text-red-500">{fileError}</p>}
      </div>

      <div className="pl-10 md:ml-[18rem] mt-5  flex justify-between">
        <Link className="flex text-[#004DE3] items-center" onClick={handleCancel}>
          Cancel
        </Link>
        <button
          className="bg-[#0C2136] me-3 text-white p-1 rounded-md w-32 text-base"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ToDialog;