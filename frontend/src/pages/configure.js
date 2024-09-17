import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import GeneralDialog from "./components/Dialog/GenralDialog";
import SignatureDialog from "./components/Dialog/SignatureDialog";
import Button from "./components/button";
import axios from "axios";
import * as XLSX from "xlsx";
import { Dropdown } from "flowbite-react";
import FormDialogContent from "./components/Dialog/FromDialogContent";
import ToDialog from "./components/Dialog/ToDialog";
import SubjectDialog from "./components/Dialog/SubjectDialog";
import Alert from "./components/Alert";
import PreviewDialog from "./components/Dialog/PreviewDialog";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AttachmentDialog from "./components/Dialog/AttachmentDialog";
import ScheduleDialog from "./components/Dialog/ScheduleDialog";
import ContentDialog from "./components/Dialog/ContentDialog";
import { useData } from "./components/context/DataContext";
Modal.setAppElement("#root");

const loadSignaturesData = () => {
  const storedData = localStorage.getItem("signatures");
  return storedData ? JSON.parse(storedData) : [];
};

function Configure({ signature }) {
  const {data} = useData();
  const navigate = useNavigate();

  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); //error message for success
  const [error, setError] = useState(""); //error message for failure
  const [signatures, setSignatures] = useState(loadSignaturesData());
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const location = useLocation();
  const { campaignName } = location.state || {};

  useEffect(() => {
    console.log("Received Campaign Name:", campaignName);
  }, [campaignName]);

 const [formData, setFormData] = useState({
   campaign_name: campaignName || "",
   email_address: localStorage.getItem("email")
     ? localStorage.getItem("email").replace(/"/g, "")
     : "",
   name: localStorage.getItem("name")
     ? localStorage.getItem("name").replace(/"/g, "")
     : "",
   to_address: localStorage.getItem("toEmail")
     ? localStorage.getItem("toEmail").replace(/"/g, "")
     : "",
   subject: localStorage.getItem("subject")
     ? localStorage.getItem("subject").replace(/"/g, "")
     : "",
   template_text: data,
   selectedFile: localStorage.getItem("attachments")
     ? localStorage.getItem("attachments").replace(/"/g, "")
     : null,
 });


  const togglePreviewDialog = () => {
    setIsPreviewDialogOpen(!isPreviewDialogOpen);
  };

  const handleEmailChange = (email) => {
    setFormData((prevData) => ({ ...prevData, email_address: email }));
  };
  const handleToEmailChange = (toEmail) => {
    setFormData((prevData) => ({ ...prevData, to_address: toEmail }));
  };

  const handleNameChange = (name) => {
    setFormData((prevData) => ({ ...prevData, name: name }));
  };

  const handleSubjectChange = (subject) => {
    setFormData((prevData) => ({ ...prevData, subject: subject }));
  };

  const handleContentChange = (template_text) => {
    setFormData((prevData) => ({ ...prevData, template_text: template_text }));
  };

  const handleSelectSignature = (signature) => {
    setSelectedSignature(signature);
  };

  const handleFileSelect = (file) => {
    setFormData((prevData) => ({ ...prevData, selectedFile: file }));
  };

  const openFromModal = () => {
    setIsFromModalOpen(true);
  };

  const closeFromModal = () => {
    setIsFromModalOpen(false);
  };

  const openToModal = () => {
    setIsToModalOpen(true);
  };

  const closeToModal = () => {
    setIsToModalOpen(false);
  };

  const openSubjectModal = () => {
    setIsSubjectModalOpen(true);
  };

  const closeSubjectModal = () => {
    setIsSubjectModalOpen(false);
  };

  const openAttachModal = () => {
    setIsAttachModalOpen(true);
  };

  const closeAttachModal = () => {
    setIsAttachModalOpen(false);
  };

  const openScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  const handleScheduleSave = (dateTime) => {
    setSelectedDateTime(dateTime);
    closeScheduleModal();
  };

  const openContentModal = () => {
    setIsContentModalOpen(true);
  };

  const closeContentModal = () => {
    setIsContentModalOpen(false);
  };

  const handleCancel = () => {
    setIsPreviewDialogOpen(false);
    setError("");
  };

  const clearForm = () => {
    setFormData({
      campaign_name: campaignName || "",
      email_address: "",
      name: "",
      to_address: "",
      subject: "",
      template_text: "",
      selectedFile: null,
    });
    setSelectedDateTime(null);
    setSelectedSignature(null);
  };

  const handleSend = async () => {
    try {
      if (
        !formData.email_address ||
        !formData.to_address ||
        !formData.subject ||
        !formData.template_text
      ) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }

      setErrorMessage("");

      let toAddress = formData.to_address;

      // If toAddress is not specified, use the one from the Excel file
      if (!toAddress) {
        const file = formData.selectedFile;

        if (file) {
          const reader = new FileReader();
          const emailAddresses = [];

          reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const emails = XLSX.utils.sheet_to_json(sheet, { header: "A" });

            emails.forEach((entry) => {
              if (entry["A"]) {
                emailAddresses.push(entry["A"]);
              }
            });

            // Update formData.to_address with the email addresses from the file
            toAddress = emailAddresses.join(", ");
            setFormData((prevData) => ({ ...prevData, to_address: toAddress }));
          };

          reader.readAsArrayBuffer(file);
        } else {
          console.error("No file selected.");
          return;
        }
      }

      // Check if there are recipients before sending the email
      if (!toAddress) {
        console.error("No recipients defined.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("campaign_name", formData.campaign_name);
      formDataToSend.append("email_address", formData.email_address);
      formDataToSend.append("to_address", toAddress);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("template_text", formData.template_text);

      if (selectedDateTime) {
        formDataToSend.append("date", selectedDateTime.date);
        formDataToSend.append("hour", selectedDateTime.hour);
        formDataToSend.append("minute", selectedDateTime.minute);
        formDataToSend.append("ampm", selectedDateTime.ampm);
      }

      if (formData.selectedFile) {
        formDataToSend.append("files", formData.selectedFile);
      }

      const response = await axios.post(
        "http://localhost:5000/submitForm",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Data sent successfully:", response.data);
        setIsPreviewDialogOpen(!isPreviewDialogOpen);

        clearForm();

        setIsAlertVisible(true);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000); // Adjust the time as needed
      } else {
        console.error("Unexpected status code:", response.status);
        setError("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending data to the backend:", error.message);
      setError("Failed to send email. Please try again.");
    } finally {
      setIsFromModalOpen(false);
    }
  };

  return (
    <>
      <Navbar />
      <Alert
        message="Email sent successfully!"
        isAlertVisible={isAlertVisible}
      />
      <Alert message={error} isAlertVisible={!!error} isErrorAlert />
      <div className="flex container mx-auto justify-between mt-8 w-[75%]">
        <h1 className="text-[#0C2136] font-bold text-2xl">
          Configure your campaign
        </h1>
      </div>

      <div className="border-2 border-[#949494] border-opacity-40 rounded-lg h-[40rem] w-[60rem] mb-5 ml-44 mt-8">
        <div className="pl-20 pt-5 flex container mx-auto justify-between">
          <div className="bg-white">
            <p className="text-[#0C2136]">From</p>
            <p className="text-gray-500">Who is sending the email?</p>
          </div>
          <div class="flex mr-10 mt-3">
            <Button
              onClick={openFromModal}
              onRequestClose={closeFromModal}
              size="small"
              text="Add Form"
            />
          </div>
        </div>
        <hr className="mt-5 border-t-1 border-opacity-40 border-[#949494]" />
        <div className="pl-20 pt-5 flex container mx-auto justify-between">
          <div className="bg-white">
            <p className="text-[#0C2136]">To</p>
            <p className="text-gray-500">Select your recipients</p>
          </div>
          <div class="flex mr-10 mt-3">
            <Button
              onClick={openToModal}
              onRequestClose={closeToModal}
              size="small"
              text="Add To"
            />
          </div>
        </div>
        <hr className="mt-5 border-t-1 border-opacity-40 border-[#949494]" />
        <div className="pl-20 pt-5 flex container mx-auto justify-between">
          <div className="bg-white">
            <p className="text-[#0C2136]">Subject</p>
            <p className="text-gray-500">
              Add your subject line for this campaign
            </p>
          </div>
          <div class="flex mr-10 mt-3">
            <Button
              onClick={openSubjectModal}
              onRequestClose={closeSubjectModal}
              size="small"
              text="Add Subject"
            />
          </div>
        </div>
        <hr className="mt-5 border-t-1 border-opacity-40 border-[#949494]" />
        <div className="pl-20 pt-5 flex container mx-auto justify-between">
          <div className="bg-white">
            <p className="text-[#0C2136]">Attachments</p>
            <p className="text-gray-500">Add your attachment here</p>
          </div>
          <div class="flex mr-10 mt-3">
            <Button
              onClick={openAttachModal}
              onRequestClose={closeAttachModal}
              size="small"
              text="Select File"
            />
          </div>
        </div>
        <hr className="mt-5 border-t-1 border-opacity-40 border-[#949494]" />
        <div className="pl-20 pt-5 flex container mx-auto justify-between">
          <div className="bg-white">
            <p className="text-[#0C2136]">Template</p>
            <p className="text-gray-500">Add your template for this campaign</p>
          </div>
          <div class="flex justify-between mr-10 mt-3 w-[20rem]">
            <Button
              onClick={openContentModal}
              onRequestClose={closeContentModal}
              size="small"
              text="New Text"
            />
            <Link to="/email/template">
              <Button size="small" text="Add Template"  />
            </Link>
          </div>
        </div>
        <hr className="mt-5 border-t-1 border-opacity-40 border-[#949494]" />
        <div className="pl-20 pt-5 flex container mx-auto justify-between">
          <div className="bg-white">
            <p className="text-[#0C2136]">Scheduling</p>
            <p className="text-gray-500">
              Set it, Forget it and let us handle the rest
            </p>
          </div>
          <div class="flex mr-10 mt-3">
            <Button
              onClick={openScheduleModal}
              onRequestClose={closeScheduleModal}
              size="small"
              text="Schedule Now"
            />
          </div>
        </div>
        <div class="flex justify-between ml-20 mt-10 w-[52.2rem] ">
          <Dropdown
            label="Add Signature"
            placement="right"
            size="sm"
            className="custom-dropdown"
            style={{ backgroundColor: "transparent", color: "#004DE3" }}
          >
            {signatures &&
              signatures.map((signature, index) => (
                <Dropdown.Item
                  className="w-40"
                  key={index}
                  onClick={() => handleSelectSignature(signature)}
                >
                  {signature.companyName}
                </Dropdown.Item>
              ))}
          </Dropdown>
          <button
            className="bg-[#0C2136] text-white p-1 rounded-md w-32 text-base"
            onClick={togglePreviewDialog}
          >
            Preview
          </button>
        </div>
      </div>
      <GeneralDialog
        isOpen={isFromModalOpen}
        onRequestClose={closeFromModal}
        dialogHeight="h-[18.7rem]"
      >
        <FormDialogContent
          onRequestClose={closeFromModal}
          onEmailChange={handleEmailChange}
          onNameChange={handleNameChange}
        />
      </GeneralDialog>
      <GeneralDialog
        isOpen={isToModalOpen}
        onRequestClose={closeToModal}
        dialogHeight="h-[19.5rem]"
      >
        <ToDialog
          onRequestClose={closeToModal}
          onToEmailChange={handleToEmailChange}
        />
      </GeneralDialog>
      <GeneralDialog
        isOpen={isSubjectModalOpen}
        onRequestClose={closeSubjectModal}
        dialogHeight="h-[16rem]"
      >
        <SubjectDialog
          onRequestClose={closeSubjectModal}
          onSubjectChange={handleSubjectChange}
        />
      </GeneralDialog>
      <GeneralDialog
        isOpen={isAttachModalOpen}
        onRequestClose={closeAttachModal}
        dialogHeight="h-[22rem]"
      >
        <AttachmentDialog
          onRequestClose={closeAttachModal}
          onFileSelect={handleFileSelect}
        />
      </GeneralDialog>
      <GeneralDialog
        isOpen={isScheduleModalOpen}
        onRequestClose={closeScheduleModal}
        dialogHeight="h-[23rem]"
      >
        <ScheduleDialog
          onRequestClose={closeScheduleModal}
          onScheduleSave={handleScheduleSave}
        />
      </GeneralDialog>
      <GeneralDialog
        isOpen={isContentModalOpen}
        onRequestClose={closeContentModal}
        dialogHeight="h-[23rem]"
      >
        <ContentDialog
          onRequestClose={closeContentModal}
          onContentChange={handleContentChange}
        />
      </GeneralDialog>
      <GeneralDialog
        isOpen={isPreviewDialogOpen}
        onRequestClose={handleCancel}
        dialogHeight="h-[23rem]"
      >
        <PreviewDialog
          formData={formData}
          selectedDateTime={selectedDateTime}
          handlePreviewSend={handleSend}
          onRequestClose={handleCancel}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </GeneralDialog>
    </>
  );
}

export default Configure;
