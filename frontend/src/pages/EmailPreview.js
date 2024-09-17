import React from 'react';
import Button from './components/button';

const EmailPreview = ({ formData, selectedDateTime, selectedSignature, onSend }) => {

  const handleSendClick = () => {
    if (onSend) {
      onSend();
    }
  };

  return (
    <div>
      <h2>Email Preview:</h2>
      <p>From: {formData.email_address}</p>
      <p>To: {formData.to_address}</p>
      <p>Subject: {formData.subject}</p>
      <p>Template: {formData.template_text}</p>
      {formData.selectedFile && (
        <p>Attached File: {formData.selectedFile.name}</p>
      )}
      {selectedDateTime && (
        <p>Scheduled Date and Time: {selectedDateTime.date} {selectedDateTime.hour}:{selectedDateTime.minute} {selectedDateTime.ampm}</p>
      )}
      {selectedSignature && (
        <p>Selected Signature: {selectedSignature.companyName}</p>
      )}
      <Button size="small" text="Send" onClick={handleSendClick}/>
    </div>
  );
};

export default EmailPreview;
