import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { AiOutlineFileDone } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Report = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showScheduled, setShowScheduled] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/campaigns');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }
    };

    fetchData();
  }, []);

  const currentCampaigns = campaigns.filter(campaign => campaign.scheduledTime !== 'undefined:undefined undefined');
  const previousCampaigns = campaigns.filter(campaign => campaign.scheduledTime === 'undefined:undefined undefined');

  const displayedCampaigns = showScheduled ? currentCampaigns : previousCampaigns;
  
  return (
    <div>
      <Navbar />
      <div className="pt-7 pb-10 m-16 justify-center rounded-[22px] shadow-2xl">
        <div className="flex text-gray-500 pb-7 ">
          <p  className={`ps-40 pe-60 text-[#A1A1A1] rounded hover:text-[#FF8E2A]  hover:underline underline-offset-[0.4rem] cursor-pointer ${
              showScheduled ? 'md:hover:bg-transparent md:hover:text-[#FF8E2A] dark:text-white md:dark:hover:text-[#FF8E2A] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:underline underline-offset-[0.4rem]' : ''
            }`}             
             onClick={() => setShowScheduled(true)}>Current Campagins</p>
          <p  className={`ps-60 pe-40 text-[#A1A1A1] rounded cursor-pointer hover:text-[#FF8E2A]  hover:underline underline-offset-[0.4rem] ${
              !showScheduled ? 'md:hover:bg-transparent md:hover:text-[#FF8E2A] dark:text-white md:dark:hover:text-[#FF8E2A] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:underline underline-offset-[0.4rem]' : ''
            }`}            
             onClick={() => setShowScheduled(false)}>Previous Campagins</p>
        </div>
        <div>
          <hr className="border-0 border-t gray-300"></hr>
        </div>

        <div className=" overflow-auto h-80">
        <div className="flex font-bold text-16 mt-2 border p-3">
          <p className="w-12 ml-2">ID</p>
          <p className="w-48 md:ml-[5rem] ">Campaign</p>
          <p className="w-20">Clicks</p>
          <p className="w-20 md:ml-[5rem]">Opens</p>
          {/* <p className="w-20">Bounces</p>
          <p className="w-20">Replies</p> */}
          <p className="w-24 md:ml-[5rem]">Date</p>
          <p className="w-32 md:ml-[5rem]">Last Sent</p>
          <p className="w-16 md:ml-14">Actions</p>
        </div>


        {displayedCampaigns.length === 0 ? (
            <div className="flex justify-center items-center h-56">
              <p className="text-gray-500 text-lg">
                {showScheduled
                  ? 'No campaigns scheduled, schedule and come back later.'
                  : 'No campaigns created, create and come back later.'}
              </p>
            </div>
          ) : (
            displayedCampaigns.map((campaign, index) => (
              <div key={campaign._id} className="flex border mt-3  p-3">
                <p className="w-12 ml-2">{index + 1}</p>
                <p className="w-48 md:ml-[2rem]">{campaign.campaignName}</p>
                <p className="w-20 md:ml-[4rem] ">{campaign.clicks ?? 0}</p>
                <p className="w-20 md:ml-[5rem] ">{campaign.opens ?? 0}</p>
                <p className="w-24 md:ml-[5rem] ">{campaign.date ?? 'N/A'}</p>
                <p className="w-32 md:ml-[5rem] ">{campaign.lastSent ?? 'N/A'}</p>
                <div className="flex space-x-2 md:ml-[3rem]">
                  {/* archive icon */}
                  <AiOutlineFileDone className="h-5 w-5" />
                  <Link to="/report/view">
                    <img src="/assets/eye.svg" className="h-5 w-5" alt="statixPro Logo" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;