import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const SubjectDialog = ({ onRequestClose, onSubjectChange }) => {
  const [subject, setSubject] = useState('');
  const [subjectError, setSubjectError] = useState('');
useEffect(() => {
  if (subject) {
    // Save data to a storage solution of your choice (localStorage, etc.)
    localStorage.setItem("subject", JSON.stringify(subject));
  }
}, [subject]);
  const handleSubjectChangeLocal = (e) => {
    const newSubject = e.target.value;
    setSubject(newSubject);
    onSubjectChange(newSubject);
    validateSubject(newSubject);
  };

  const validateSubject = (subject) => {
    setSubjectError(subject.trim() !== '' ? '' : 'Please enter a subject.');
  };

  const handleCancel = () => {
    onRequestClose();
  };

  const handleSave = () => {
    validateSubject(subject);

    // Proceed only if there are no validation errors
    if (subjectError === '' && subject.trim() !== '') {
      // Perform additional actions or save logic here
      console.log('Subject:', subject);

      // Close the dialog
      onRequestClose();
    }
  };

  return (
    <div>
      <h2 className="text-xl p-7 font-medium">Subject :</h2>
      <div className="pl-7 mt-[-1rem]">
        <label className="block text-lg font-medium mb-2" htmlFor="name">
          Subject Line
        </label>
        <input
          type="text"
          id="subject"
          onChange={handleSubjectChangeLocal}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 block w-[65%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {subjectError && <p className="text-red-500">{subjectError}</p>}
      </div>

      <div className="pl-10 md:ml-[18rem] mt-10  flex justify-between">
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

export default SubjectDialog;
