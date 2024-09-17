import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar'
import GeneralDialog from './components/Dialog/GenralDialog';
import SignatureDialog from './components/Dialog/SignatureDialog';
import Button from './components/button'

const loadSignaturesData = () => {
  const storedData = localStorage.getItem('signatures');
  return storedData ? JSON.parse(storedData) : [];
};

const Profile = () => {
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [signatures, setSignatures] = useState(loadSignaturesData()); 
  const [editIndex, setEditIndex] = useState(null);
  const [editedSignature, setEditedSignature] = useState(null);
  const [allCampaigns, setAllCampaigns] = useState([]);


  useEffect(() => {
    const fetchRecentCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/campaigns");
        const data = await response.json();
        setAllCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchRecentCampaigns();
  }, []);

  const totalCampaignsCount = allCampaigns.length;

  const openSigModal = () => {
    setIsSignatureModalOpen(true);
    setEditIndex(null);
    setEditedSignature(null);
  };

  const closeSigModal = () => {
    setIsSignatureModalOpen(false);
    setEditIndex(null);
    setEditedSignature(null);
  };

  const saveSignature = (formData) => {
    let updatedSignatures;
    if (editIndex !== null) {
      // If editIndex is not null, it means we are editing an existing signature
      updatedSignatures = [...signatures];
      updatedSignatures[editIndex] = formData;
    } else {
      // If editIndex is null, it means we are adding a new signature
      updatedSignatures = [...signatures, formData];
    }
  
    // Encode the image data to Base64 before storing it
    updatedSignatures.forEach((signature) => {
      if (signature.logo instanceof File) {
        const reader = new FileReader();
        reader.onload = (event) => {
          signature.logo = event.target.result;
        };
        reader.readAsDataURL(signature.logo);
      }
    });
  
    setSignatures(updatedSignatures);
    localStorage.setItem('signatures', JSON.stringify(updatedSignatures));
    setIsSignatureModalOpen(false);
    setEditIndex(null);
    setEditedSignature(null);
  };
  
  const handleEditSignature = (index) => {
    // When the "Edit" button is clicked on a signature card, set the editIndex
    // and the editedSignature to enable editing
    setEditIndex(index);
    setEditedSignature(signatures[index]);
    setIsSignatureModalOpen(true);
  };

  const handleDeleteSignature = (index) => {
    const updatedSignatures = [...signatures];
    updatedSignatures.splice(index, 1);
    setSignatures(updatedSignatures);
    localStorage.setItem('signatures', JSON.stringify(updatedSignatures));
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div class="flex flex-col items-start mx-auto bg-white  border-gray-200 rounded-lg shadow-xl md:flex-row md:max-w-4xl mt-10 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {/* <img class="object-cover w-full rounded-t-lg shadow-xl h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/assets/pro.jpg" alt="" /> */}
        <div class="flex flex-col justify-between items-start p-5">
          <h5 className="text-lg font-normal mb-2 text-[#0C2136] dark:text-white">
            Name<span className="ml-[7.2rem]">:</span> Statix Pro
          </h5>
          <h5 className="text-lg font-normal mb-2 text-[#0C2136] dark:text-[#A1A1A1]">
            Email<span className="ml-[7.5rem]">:</span> statixpro@gmail.com
          </h5>
          <h5 className="text-lg font-normal text-[#0C2136] dark:text-[#A1A1A1]">
            Total Campaigns<span className="ml-3">:</span>
            <span className="ml-1">{totalCampaignsCount}</span>
          </h5>
          <div className="container w-[40rem] flex justify-between mt-16">
            {/* <button type="button" class="text-white bg-gradient-to-r  bg-[#0C2136] hover:bg-gradient-to-br hover:bg-[#FF8E2A]  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Change Password</button> */}
            <button
              type="button"
              class="text-white bg-gradient-to-r  bg-[#0C2136] hover:bg-gradient-to-br hover:bg-[#FF8E2A] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={openSigModal}
              onRequestClose={closeSigModal}
            >
              Add Signature
            </button>
          </div>
        </div>
      </div>
      <div className="container font-medium p-10 ml-[12.5rem]">
        <h1 className="text-xl ">Signatures:</h1>
      </div>
      <GeneralDialog
        isOpen={isSignatureModalOpen}
        onRequestClose={closeSigModal}
        dialogHeight="h-[20rem]"
      >
        <SignatureDialog
          onRequestClose={closeSigModal}
          onSave={saveSignature}
          editedSignature={editedSignature}
        />
      </GeneralDialog>
      {signatures.map((signature, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-2xl ml-56 mb-10 inline-block w-80 p-4"
        >
          <h3 className="text-lg font-medium">Signature {index + 1}:</h3>
          <p>{signature.companyName}</p>
          
          {signature.logo ? (
            <img
              src={signature.logo}
              alt="Company Logo"
              style={{ maxWidth: "100px" }}
            />
          ) : (
            ""
          )}
          <div className="flex justify-between mt-2 w-[18.5rem]">
            <Button
              onClick={() => handleEditSignature(index)}
              text="Edit"
              size="small"
            ></Button>
            <Button
              onClick={() => handleDeleteSignature(index)}
              size="small"
              text="Delete"
            ></Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile
