import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
const SignatureDialog = ({ onRequestClose, onSave, editedSignature }) => {
  const [formData, setFormData] = useState(
    editedSignature || {
      companyName: '',
      logo: null,
    }
  );
const {setSharedLink} = useData();
  
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    setSharedLink(formData.link);
    onSave(formData);
    onRequestClose();
  };

  const handleCancel = () => {
    onRequestClose();
  };

  return (
    <div className="p-7  overflow-y-auto overflow-x-hidden h-full">
      <h2 className="text-xl p-7 font-medium mt-[-1.5rem]">Signature Form:</h2>
      <div className="pl-7 mt-[-1rem]">
        <label
          className="block text-lg font-medium mb-2"
          htmlFor="company-name"
        >
          Regrad's Name
        </label>
        <textarea
          type="text"
          id="company-name"
          name="companyName"
          rows={6}
          style={{ resize: "none" }}
          value={formData.companyName}
          onChange={handleInputChange}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 block w-[65%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div className="pl-7 mt-[1rem]">
        <label className="block text-lg font-medium mb-2" htmlFor="logo">
          Company Logo
        </label>
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/*"
          onChange={handleInputChange}
          className="bg-white border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 block w-[65%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="pl-10 ml-[20rem] mt-4 w-[17rem] flex justify-between">
        <Link
          className="flex text-[#004DE3] items-center"
          onClick={handleCancel}
        >
          Cancel
        </Link>
        <button
          className="bg-[#0C2136] text-white p-1 rounded-md w-32 text-base"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignatureDialog;
