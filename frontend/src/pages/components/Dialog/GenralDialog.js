import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

function GeneralDialog({ isOpen, onRequestClose, children, dialogHeight }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="General Dialog"
      className={`modal-style bg-white text-black shadow-2xl w-[25rem] md:w-[36rem]  rounded-xl mt-36 mx-auto ${dialogHeight}`}
      >  
      {children}
    </Modal>
  );
}

export default GeneralDialog;
