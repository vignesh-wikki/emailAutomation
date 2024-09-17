import React from 'react';

const Button = ({ text, size, onClick }) => {
  
  const buttonSizeClasses = {
    small: 'p-1 rounded-md w-32 text-base',
    medium: 'p-2 rounded-md w-56 text-lg',
    large: 'p-3 rounded-md w-72 text-xl',
  };

  const sizeClass = buttonSizeClasses[size] || buttonSizeClasses.medium;

  return (
    <div>
      <button
        className={`bg-[#FF8E2A] text-white hover:bg-[#A1A1A1] ${sizeClass}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
