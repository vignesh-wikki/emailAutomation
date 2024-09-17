import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import GeneralDialog from './components/Dialog/GenralDialog';
import CreateCampaign from './components/Dialog/CreateCampaign';
import Button from './components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Campaign = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/campaigns');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
    <div>
      <Navbar/>
      <div className="flex container mx-auto justify-between mt-8  w-[75%]  flex-wrap">
        <h1 className="text-[#0C2136] pe-4   font-bold text-3xl">Your Campaigns</h1>
        <div className='md:mt-0 mt-9'>
            <Button onClick={openModal} onRequestClose = {closeModal} size="medium" text = "Create Campaign"/> 
        </div>
      </div>
      <div className="flex container mx-auto justify-between mt-10 w-[75%]">
          <button type="submit" class="inline-flex items-center h-10 px-8 ml-2 text-sm font-medium text-[#A1A1A1] bg-[#E0E0E0] rounded-lg border border-[#E0E0E0] hover:bg-[#E0E0E0] focus:ring-1 focus:ring-opacity-50 focus:outline-none focus:ring-[#0C2136] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
            <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </button>
        <div>
        <button
        type="submit"
        className="inline-flex items-center h-10 px-8 ml-2 text-sm font-medium text-[#A1A1A1] bg-[#E0E0E0] rounded-lg border border-[#E0E0E0] hover:bg-[#E0E0E0] focus:ring-1 focus:ring-opacity-50 focus:outline-none focus:ring-[#0C2136] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
        Filter
        <FontAwesomeIcon icon={faFilter} className="ml-2" />
        </button>       
        </div>
      </div>
      <div className="flex flex-col container mx-auto justify-center mt-10">
      {campaigns.length === 0 ? (
          // Render this when there are no scheduled campaigns
          <div className="justify-between ms-[20rem] w-[50rem] rounded-[22px] flex shadow-2xl m-7 p-1">
            <div className="text-[#0C2136] flex">
            <img className="flex-1" src="/assets/recent.jpg" alt="Statix Pro" height={200} width={200}/>
              <p className="text-2xl flex-1 w-[30rem] ml-16 mt-10">No Campaigns Created.</p>
            </div>
          </div>
        ) :(
          campaigns.map((campaign) => (
          <div key = {campaign.id} class="max-w-xxl flex mb-10 container mx-auto justify-between w-[80%] p-4  rounded-2xl shadow-xl dark:bg-gray-800 dark:border-gray-700">
          <div>
                <a href="#">
                  <h5 className="mb-2 text-2xl font-medium tracking-tight text-[#0C2136] dark:text-white">{campaign.campaignName}</h5>
                </a>
                <p className="mb-3 ml-1 font-normal text-[#0C2136]  dark:text-gray-400">{campaign.subjectLine}</p>
          </div>
            <div class="flex mt-5"> 
                <div class="text-center mt-1">
                    <a href="#" class="px-3 py-2 text-sm  font-medium">
                        Clicks
                    </a>
                    <div class="mt-[0.02rem]">0</div> 
                </div>
                <div class="ml-3 text-center mt-1">
                    <a href="#" class="px-3 py-2 text-sm font-medium">
                        Opens
                    </a>
                    <div class="mt-[0.02rem]">0</div> 
                </div>
                <a href="#" class="px-3 py-2 text-sm  h-8 items-end font-medium text-center text-[#0C2136] rounded-md hover:bg-[#FF8E2A] hover:text-white focus:ring-1 focus:outline-none focus:ring-[#E0E0E0] dark:bg-[#E0E0E0] dark:hover:bg-[#E0E0E0] dark:focus:ring-[#E0E0E0]">
                    Preview
                </a>
            </div>
          </div>
          ))
        )}
      </div>

      <Footer/>
        <GeneralDialog isOpen={isModalOpen} onRequestClose={closeModal} dialogHeight= "">
            <CreateCampaign onRequestClose={closeModal} />
        </GeneralDialog>      
    </div>
    </>
  )
}

export default Campaign
