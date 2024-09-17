import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import { useData } from "./components/context/DataContext";
import { Link } from 'react-router-dom';
import TemplateModel from "../pages/components/Dialog/TemplateDialog";
const EmailTemplate = () => {
  const url = process.env.REACT_APP_TEMPLETE_URL;
  const [isHovered, setIsHovered] = useState(null);
  const [model, setModel] = useState(false);
  const [uploadtemplete, setuploademplte] = useState(false);
  const [template, setTemplate] = useState([]);
  const [modelData, setModelData] = useState();
   const navigate = useNavigate();
   const { setSharedData } = useData();

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataArray = Array.isArray(response.data)
          ? response.data
          : [response.data];

        setTemplate(dataArray);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTemplate();
  }, []);

  const handleMouseEnter = (index, data) => {
    setModelData(data);
    setIsHovered(index);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handlemodel = () => {
    setModel(true);
    setuploademplte(false);
  };
  const handlemodels = (data) => {
    setModel(data);
  };
  const handleUploadClose = (data) => {
    setuploademplte(data);
  };
  return (
    <>
      <Navbar />
      <div className=" flex flex-col min-h-screen">
        <div className="">
          <div className="flex justify-around mt-9 flex-wrap order-1">
            <div className="mb-5 md:mr-56 md:mb-0 mr-20">
              <p className="text-[#0C2136] font-bold text-3xl">
                Your Templetes
              </p>
              <div className="pt-9 flex justify-between  items-baseline">
                <div class="pt-2 relative flex items-center mx-auto text-gray-600">
                  <input
                    class="border-2 w-36 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search"
                  />

                  <button
                    type="submit"
                    class="absolute right-0 top-0 mt-5 mr-3"
                  >
                    <svg
                      className="text-gray-600 h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 56.966 56.966"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="border px-4 py-2 rounded-lg bg-[#FF8E2A] text-white text-lg">
                <div className="flex">
                  <button
                    onClick={() => {
                      setuploademplte(true);
                      setModel(false);
                    }}
                    className="pe-3"
                  >
                    Create Templete
                  </button>
                  <svg
                    xmlns="http://www.whandlemodel3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="mt-1 w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-9">
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  class="text-gray-600  border-2 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
                  type="button"
                >
                  Filters
                  <img
                    src="/assets/edit.png"
                    alt="filter icon"
                    handlemodel
                    className=" ms-2 w-5 h-5"
                  />
                </button>

                <div
                  id="dropdown"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <p class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Dashboard
                      </p>
                    </li>
                    <li>
                      <p class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Settings
                      </p>
                    </li>
                    <li>
                      <p class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Earnings
                      </p>
                    </li>
                    <li>
                      <p class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Sign out
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className=" w-full h-auto">
              <div className="order-2  flex justify-around flex-wrap mt-9  lg:mx-60 md:54 mx-0">
                {template.map((data, index) => (
                  <div key={index} className="">
                    <div
                      onMouseEnter={() => handleMouseEnter(index, data)}
                      onMouseLeave={() => handleMouseLeave()}
                      className=" m-9 block w-[18rem] h-auto rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] gap-8"
                    >
                      <div className=" overflow-hidden bg-cover bg-no-repeat">
                        <div className="mx-auto relative">
                          {isHovered === index ? (
                            <>
                              <button
                                onClick={() => {
                                  handlemodel();
                                }}
                                modelData
                                className="font-medium z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border text-white px-4 py-1 rounded-[5rem] hover:bg-slate-300 hover:text-black"
                              >
                                Preview
                              </button>
                              <Link to="/configure">
                                <button
                                  onClick={
                                  setSharedData(data.content)

                                    }
                                  className="font-medium z-10 absolute top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border text-white px-4 py-1 rounded-[5rem] hover:bg-slate-300 hover:text-black"
                                >
                                  Use
                                </button>
                              </Link>
                            </>
                          ) : null}
                          <div
                            className={`ease-in  h-40 text-2xl flex justify-center items-center text-white italic font-bold bg-gradient-to-tl from-orange-300 to-orange-200 duration-200 rounded-t-lg ${
                              isHovered === index ? "blur" : ""
                            }`}
                          >
                            {data.name}
                          </div>
                        </div>
                      </div>
                      <div className="p-6 h-40 w-30 overflow-hidden">
                        <p className="capitalize overflow-hidden font-bold">
                          Heading
                        </p>
                        <p className="capitalize overflow-hidden text-base text-neutral-600 dark:text-neutral-200">
                          {data.name}
                        </p>
                        <p className="capitalize font-bold">Description</p>
                        <p  className="text-base w-30 text-neutral-600 dark:text-neutral-200">
                          {data.description}
                        </p>
                      </div>
                    </div>
                    <TemplateModel
                      key={index}
                      uploadtemplete={uploadtemplete}
                      model={model}
                      handlemodels={handlemodels}
                      handleUploadClose={handleUploadClose}
                      modelData={modelData}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplate;
