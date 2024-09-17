import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateCampaign = ({ onRequestClose }) => {
  const [campaignName, setCampaignName] = useState('');
  const [error, setError] = useState('');
  const [attemptedCreate, setAttemptedCreate] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    onRequestClose();
  };

  const handleCreateCampaign = () => {
    // Set the attemptedCreate flag to true
    setAttemptedCreate(true);

    if (campaignName.trim() === '') {
      setError('Please enter a campaign name.');
    } else {
      setError('');
      console.log('Creating Campaign with Name:', campaignName);
      navigate('/configure', { state: { campaignName } });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl px-4  pt-3 pb-7 font-medium">
        Create your email campaign
      </h2>
      <p className="pl-7 px-6 mt-[-1rem] text-[#A1A1A1] text-sm">
        Write a Campaign name that will help you find it easily in the list of
        your campaigns. This name will only be visible to you.
      </p> 
      <h2 className="text-xl px-4  pt-3 pb-7 font-medium">Campaign Name</h2>
      <div className="pl-7 mt-[-1rem]">
        <input
          type="text"
          id="campaign_name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 block w-[65%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      {/* Only show error if attemptedCreate is true */}
      {attemptedCreate && campaignName.trim() === "" && (
        <p className="pl-7 text-red-500">Please enter a campaign name.</p>
      )}
      <div className="ml-[7rem] md:ml-[17rem] mt-[2rem]  flex ">
        <Link
          className="flex text-[#004DE3] items-center"
          onClick={handleCancel}
        >
          Cancel
        </Link>
        <button
          type="button"
          className="text-white ms-9 mt-2 bg-gradient-to-r bg-[#0C2136] hover:bg-gradient-to-br hover:bg-[#FF8E2A] font-medium rounded-lg text-sm px-3.5 py-2 text-center  mb-2"
          onClick={handleCreateCampaign}
        >
          Create Campaign
        </button>
      </div>
    </div>
  );
};

export default CreateCampaign;
