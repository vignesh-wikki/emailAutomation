import React from 'react';
import { IoMdPerson } from 'react-icons/io';
import {Link } from 'react-router-dom';


const navbar = () => {
  return (
    <div>    
        <nav className="w-full bg-white border-gray-200 dark:bg-gray-900 shadow-lg h-12">
            <div className=" flex  items-center justify-between ">
                <Link to="/" className="flex items-center">
                    <img 
                        src="/assets/removebg.png" 
                        className="h-16  mr-2" 
                        alt="Statix Pro Logo" 
                    />
                </Link>
            <div className="flex items-center md:order-2">
                <button type="button" className="flex mr-3 mb-4 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="sr-only">Open user menu</span>
                    <div>
                        <IoMdPerson size={25} color='white'/> 
                    </div>
                </button>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-white rounded-lg dark:bg-gray-700 dark:divide-gray-600 text-black shadow-lg" id="user-dropdown">                    
                    <div className="px-4 py-3 ">
                        <span className="block text-sm text-gray-900 dark:text-black">User Name</span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">usermail@gmail.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <hr />
                    <li>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-[#A1A1A1] hover:bg-[#FF8E2A] hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black">Edit profile</Link>
                    </li>
                    <li>
                        <Link to="/" className="block px-4 py-2 text-sm text-[#A1A1A1] hover:bg-[#FF8E2A] hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black">Saved List</Link>
                    </li>
                    <li>
                        <Link to="/" className="block px-4 py-2 text-sm text-[#A1A1A1] hover:bg-[#FF8E2A] hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-black">Log out</Link>
                    </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 mb-4" aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            <div className="hidden w-full p-3 md:flex md:w-[45rem] md:order-1 mb-4 mr-32" id="navbar-user">
            <ul className="flex flex-col  justify-evenly font-medium p-4 md:p-0 w-[50rem] mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <Link to="/" className="  text-[#A1A1A1] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF8E2A] md:p-0 dark:text-white md:dark:hover:text-[#FF8E2A] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:underline underline-offset-[0.4rem] ">Dashboard</Link>
                </li>
                <li>
                    <Link to="/campaign" className=" text-[#A1A1A1] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF8E2A] md:p-0 dark:text-white md:dark:hover:text-[#FF8E2A] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:underline underline-offset-[0.4rem] ">Campaigns</Link>
                </li>
                <li>
                    <Link to="/email/template" className="  text-[#A1A1A1] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF8E2A] md:p-0 dark:text-white md:dark:hover:text-[#FF8E2A] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:underline underline-offset-[0.4rem]">Email Templetes</Link>
                </li>
                <li>
                    <Link to="/report" className="  text-[#A1A1A1] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF8E2A] md:p-0 dark:text-white md:dark:hover:text-[#FF8E2A] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:underline underline-offset-[0.4rem]">Report</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    </div>
  )
}

export default navbar
