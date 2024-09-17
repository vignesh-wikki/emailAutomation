import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';


const Dashboard = () => {
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [recentCampaigns, setRecentCampaigns] = useState([]);
  const [scheduledCampaigns, setScheduledCampaigns] = useState([]);

  useEffect(() => {
    const fetchRecentCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/campaigns");
        const data = await response.json();
        setAllCampaigns(data);
        const filteredRecentCampaigns = data.filter(
          (campaign) =>
            !campaign.scheduledDate && campaign.scheduledTime === "undefined:undefined undefined"
        );
        const lastThreeRecentCampaigns = filteredRecentCampaigns.slice(-3);

        setRecentCampaigns(lastThreeRecentCampaigns);

        const filteredScheduledCampaigns = data.filter(
          (campaign) =>
            campaign.scheduledDate &&
            campaign.scheduledTime !== "undefined:undefined undefined"
        );

        setScheduledCampaigns(filteredScheduledCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchRecentCampaigns();
  }, []);

  const totalCampaignsCount = allCampaigns.length;

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-[#27debf]">
        <div className="flex flex-wrap">
          <div className="flex=1 pe-9 ml-28 w-96 flex-col">
            <p className="pt-5 ml-[-1.1rem] font-bold text-2xl ">
              {" "}
              Welcome [Username]
            </p>
            <div className="h-auto md:w-96 w-80 mt-8">
              <img
                src="/assets/DBimg.png"
                alt="Statix Pro"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className=" flex-1 ml-[3rem] md:ml-[15rem] mt-20">
            <div className="w-[24rem] ">
              <div className="flex justify-between border rounded-[10px] p-6 border-solid font-semibold border-black m-3 space-x-20">
                <p className="text-lg">Total Campaigns</p>
                <div className="flex space-x-6 text-2xl">
                  <p>{totalCampaignsCount}</p>
                  <Link to="/report">
                    <FaArrowRight className="h-7 w-7 mt-[2px]" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-[24rem]">
              <div className="justify-between flex border rounded-[10px]  p-6 border-solid border-black  font-semibold text-2xl  m-3 space-x-32">
                <p>Clicks</p>
                <div className="flex space-x-6">
                  <p>0</p>
                  <Link to="/report">
                    <FaArrowRight className="h-7 w-7 mt-[2px]" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-[24rem]">
              <div className="justify-between flex border rounded-[10px] p-6 border-solid border-black  font-semibold text-2xl  m-3 space-x-32">
                <p>Opens</p>
                <div className="flex space-x-6">
                  <p>0</p>
                  <Link to="/report">
                    <FaArrowRight className="h-7 w-7 mt-[2px]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="ps-[7rem] pt-5 font-bold text-2xl text-[#0C2136]">
          {" "}
          Recent Campaigns{" "}
        </p>
        {recentCampaigns.length === 0 ? (
          // Render this when there are no scheduled campaigns
          <div className="justify-between ms-[20rem] w-[50rem] rounded-[22px] flex shadow-2xl m-7 p-1">
            <div className="text-[#0C2136] flex">
              <img
                className="flex-1"
                src="/assets/recent.jpg"
                alt="Statix Pro"
                height={200}
                width={200}
              />
              <p className="text-2xl flex-1 w-[30rem] ml-16 mt-10">
                No Campaigns Created.
              </p>
            </div>
          </div>
        ) : (
          recentCampaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="justify-between md:ms-[7rem] md:me-[7rem] ms-[3rem] me-[3rem] bg-[#0C2136] rounded-[22px] flex border shadow-2xl m-7 p-7"
            >
              <div className="text-white">
                <p className="text-xl">{campaign.campaignName}</p>
                <p>{campaign.subjectLine}</p>
              </div>
              <div class="flex text-white">
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
                <a
                  href="#"
                  class="px-3 py-2 text-sm  h-8 items-end font-medium text-center text-[#fff] rounded-[5px] hover:bg-[#FF8E2A] hover:text-white focus:ring-1 focus:outline-none focus:ring-[#E0E0E0] dark:bg-[#E0E0E0] dark:hover:bg-[#E0E0E0] dark:focus:ring-[#E0E0E0]"
                >
                  Preview
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <p className="ps-[7rem] pt-5 font-bold text-2xl text-[#0C2136]">
          {" "}
          Scheduled Content:{" "}
        </p>
        {scheduledCampaigns.length === 0 ? (
          // Render this when there are no scheduled campaigns
          <div className="justify-between ms-[20rem] w-[50rem] rounded-[22px] flex shadow-2xl m-7 p-1">
            <div className="text-[#0C2136] flex w-40  md:w-80 h-auto">
              <img
                className="flex-1 w-full h-auto"
                src="/assets/schdule.jpg"
                alt="Statix Pro"
              />
              <p className="text-2xl flex-1 w-[30rem] ml-16 mt-10">
                No Scheduled Campaigns
              </p>
            </div>
          </div>
        ) : (
          // Render scheduled campaigns when available
          scheduledCampaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="justify-between ms-[7rem] me-[7rem] rounded-[22px] flex shadow-2xl m-7 p-7"
            >
              <div className="text-[#0C2136]">
                <p className="text-xl">{campaign.campaignName}</p>
                <p>{campaign.subjectLine}</p>
              </div>
              <div className="space-x-8 flex text-[#0C2136] pt-3">
                <p>
                  Date: {new Date(campaign.scheduledDate).toLocaleDateString()}
                </p>
                <p>Time: {campaign.scheduledTime}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-10">
        <div className="justify-between ms-[4rem] bg-[#0C2136]  rounded-[22px] flex shadow-2xl m-12 p-7">
          <div className="text-white">
            <p className="text-xl">Explore Templets:</p>
            <p>
              Browse our library of email templets to find the perfect design
              for your message
            </p>
          </div>
          <div className="flex text-white">
            <Link to="/email/template">
              <button className="hover:bg-[#FF8E2A] rounded-[5px] p-2 mt-2 mb-2 ps-3 pe-3">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
        <div className="justify-between ms-[4rem] bg-[#0C2136]  rounded-[22px] flex shadow-2xl m-12 p-7">
          <div className="text-white">
            <p className="text-xl">Track Your Success:</p>
            <p>Mentor your Campaign and find your strategies</p>
          </div>
          <div className="flex text-white">
            <Link to="/report">
              <button className="hover:bg-[#FF8E2A] rounded-[5px] p-2 mt-2 mb-2 ps-3 pe-3">
                Track Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard ;
