  import React, { useCallback, useEffect, useState } from 'react';
  import { useDropzone } from 'react-dropzone';
  import { Link } from 'react-router-dom';
  import { FaFileUpload } from "react-icons/fa";


  const Dropzone = ({ onRequestClose, onFileSelect }) => {

      const handleCancel = () => {
          onRequestClose();
        };

    const [selectedImageName, setSelectedImageName] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setSelectedImageName(selectedFile.name);
      onFileSelect(selectedFile); 
      setimageFile(selectedFile);
    }, [onFileSelect]);
     useEffect(() => {
      
     }, [selectedImageName]);
     function setimageFile(imageFile){
       if (selectedImageName) {
         // Save data to a storage solution of your choice (localStorage, etc.)
         localStorage.setItem("attachements", JSON.stringify(imageFile));
       }
     }
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/*',
    });

    return (
      <>
      <div className='p-10 '>
          <h2 className='mt-[-1.5rem] font-bold'>Attachments :</h2>
          <div {...getRootProps()} className='bg-gray h-[13rem] mt-2 border border-opacity-40 border-[#949494] rounded-md'>
          <input {...getInputProps()} />
          <FaFileUpload size={70} color='#949494' className='mt-10 ml-[14.5rem]'/>
          <p className='text-[#A1A1A1] mt-10 ml-20'>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <p className='text-[#0C2136] p-3'>Selected image : {selectedImageName}</p>
          <div className=' md:ml-[18.4rem] flex justify-between '>
            <Link className='flex text-[#004DE3] items-center' onClick={handleCancel}>Cancel</Link>
            <button className='bg-[#0C2136] text-white p-1 rounded-md w-32 text-base' onClick={handleCancel} >Save</button>
        </div>
      </div>
      </>
    );
  };

  export default Dropzone;