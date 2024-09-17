import React from 'react';
import Button from '../button';
import { Link } from 'react-router-dom';

const PreviewDialog = ({ formData, selectedDateTime,onRequestClose, handlePreviewSend, errorMessage, setErrorMessage }) => {
    console.log('formData:', formData);
    const handleCancel = () => {
        onRequestClose();
      };
      const email = localStorage.getItem("email").replace(/"/g, "");
      const name = localStorage.getItem("name").replace(/"/g, "");
      const toEmail = localStorage.getItem("toEmail").replace(/"/g, "");
      const subject = localStorage.getItem("subject").replace(/"/g, "");
  return (
    <div className="bg-white h-[25rem] overflow-y-auto overflow-x-hidden p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-[#0C2136]">Preview</h2>
      <h6 className="text-md font-bold text-[#0C2136] mb-4">
        Make sure you have filled all the required fields before sending the
        Email.
      </h6>
      <div className="mb-4">
        <p className="text-gray-600">
          <span className="font-bold">Email Address:</span>{" "}
         
          {email}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Name:</span> {name}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">To Address:</span>{" "}
          {formatToAddress(toEmail)}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Subject:</span> {subject}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Template Text:</span>{" "}
          <div dangerouslySetInnerHTML={{ __html: formData.template_text }} />
        </p>
      </div>
      {selectedDateTime && (
        <p className="text-gray-600">
          <span className="font-bold">Scheduled Time:</span>
          {selectedDateTime.date} {selectedDateTime.hour}:
          {selectedDateTime.minute} {selectedDateTime.ampm}
        </p>
      )}
      {formData.selectedFile && (
        <p className="text-gray-600">
          <span className="font-bold">Attachment:</span>
          {formData.selectedFile.name}
        </p>
      )}
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      <div className="pl-10 md:ml-[18rem] mt-2  flex justify-between">
        <Link
          className="flex me-5 text-[#004DE3] items-center"
          onClick={handleCancel}
        >
          Cancel
        </Link>
        <Button onClick={handlePreviewSend} size="small" text="Send" />
      </div>
    </div>
  );
};

const formatToAddress = (toAddress) => {
  const emailList = toAddress.split(',').map(email => email.trim());

  if (emailList.length <= 3) {
    return emailList.join(', ');
  } else {
    const truncatedList = emailList.slice(0, 3).join(', ');
    const remainingCount = emailList.length - 3;
    return `${truncatedList} + ${remainingCount} more`;
  }
};

export default PreviewDialog;
