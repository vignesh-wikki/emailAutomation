import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ScheduleDialog = ({ onRequestClose, onScheduleSave }) => {
  const handleCancel = () => {
    onRequestClose();
  };

  const [date, setDate] = useState('');
  const [hour, setHour] = useState('01'); 
  const [minute, setMinute] = useState('00');
  const [ampm, setAmPm] = useState('AM');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Date:', date);
    console.log('Time:', `${hour}:${minute} ${ampm}`);
    onScheduleSave({ date, hour, minute, ampm });

  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 h-[23rem] rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Scheduling :</h1>
        <h2 className='font-medium text-lg'>From: abc@gmail.com</h2>
        <div className="mb-4 mt-6">
          <label htmlFor="date" className="block mb-1 font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block mb-1 font-medium">
            Time (12-Hour Format)
          </label>
          <div className="flex">
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="p-2 border w-60 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                  {String(i + 1).padStart(2, '0')}
                </option>
              ))}
            </select>
            <span className=" px-5 font-bold mt-1 text-2xl">:</span>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="p-2 border w-48 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={String(i).padStart(2, '0')}>
                  {String(i).padStart(2, '0')}
                </option>
              ))}
            </select>
            <select
              value={ampm}
              onChange={(e) => setAmPm(e.target.value)}
              className="p-2 border ml-2 w-48 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>  
        </div>
        <div className='pl-10 md:ml-[18rem] mt-6 flex justify-between'>
          <Link className='flex text-[#004DE3] items-center' onClick={handleCancel}>Cancel</Link>
          <button className='bg-[#0C2136] text-white p-1 rounded-md w-32 text-base'>Save</button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleDialog;
