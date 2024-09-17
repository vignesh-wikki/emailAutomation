import React from 'react'
import Navbar from './components/navbar'

export default function report2() {
  return (
    <div>
        <Navbar/>
        <div className=" overflow-y-auto h-[20rem] w-[50rem]  pt-2  mx-auto mt-10 mb-4 justify-center border rounded-[22px] bg-white border-gray-500 dark:bg-gray-900 shadow-2xl h-12"> 
        <div class="flex ps-12 p-2 pe-10 text-xl font-semibold text-black-1000 justify-between">
          <p>ID : 1234</p>
          <p>Campaign Name : abcdef</p>
        </div>
        <div class="border-t border-gray-500 mt-2">
        <div class="flex ps-9 pt-4 pe-24 text-xl font-semibold text-black-1000  justify-between">
          <p>Name</p>
          <p> Responses</p>
        </div>
        <div class="flex ps-9 pt-4 pe-20 text-xl justify-between">
          <p>name 1</p>
          <p>abc@gmail.com </p>
        </div>
        <div class="flex ps-9 pt-4 pe-20 text-xl justify-between">
          <p>name 2</p>
          <p>abc@gmail.com </p>
        </div>
        <div class="flex ps-9 pt-4 pe-20 text-xl justify-between">
          <p>name 3</p>
          <p>abc@gmail.com </p>
        </div>
        <div class="flex ps-9 pt-4 pe-20 text-xl justify-between">
          <p>name 4</p>
          <p>abc@gmail.com </p>
        </div>
        </div>
    </div>
    <div  class=" text-center text-xl font-semibold text-blue-600  hover:scale-110">
      <button>Close</button>
    </div>
</div>
  )
}
