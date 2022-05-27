import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ProfileTable from '../../partials/digitalId/ProfileTable';
import Image from '../../images/transactions-image-04.svg';

function Profile () {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [removeFormOpen, setRemoveFormOpen] = useState(false);
  const [changeFormOpen, setChangeFormOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
    if (selectedItems.length > 0) {
      setRightSidebarOpen(false);
      setChangeFormOpen(true);
    }
  };

  const openAddForm = () => {
    setFormOpen(true);
    setRightSidebarOpen(false);
  }

  const cancelAddForm = () => {
    setFormOpen(false);
    setRightSidebarOpen(true);
  }

  const openRemoveForm = () => {
    setRemoveFormOpen(true);
    setChangeFormOpen(false);
  }

  const canselRemoveForm = () => {
    setRemoveFormOpen(false);
    setRightSidebarOpen(true);
  }
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={leftSidebarOpen} setSidebarOpen={setLeftSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={leftSidebarOpen} setSidebarOpen={setLeftSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="mx-auto flex flex-col lg:flex-row lg:space-x-8">
              {/* Page header */}
              <div>
                {/* Title */}
                <div>
                  <ul className="flex flex-wrap -m-1">
                    <li className="m-1">
                      <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                        View All
                      </button>
                    </li>
                    <li className="m-1">
                      <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                        Validated
                      </button>
                    </li>
                    <li className="m-1">
                      <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                        Blockchained
                      </button>
                    </li>
                  </ul>
                </div>
                {/* Table */}
                <ProfileTable selectedItems={handleSelectedItems}/>
              </div>
              {/* left Sidebar */}
              <div>
                {/* Form with button*/}
                <div className={`${!rightSidebarOpen && "hidden"}`}>
                  <div className="bg-white px-5 py-[43px] shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                    <button
                      className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                      onClick={openAddForm}
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                      </svg>
                      <span className="ml-1">Add new field</span>
                    </button>
                  </div>
                </div>
                {/* Add Form */}
                <div className={`${!formOpen && 'hidden'}`}>
                  <div className="bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                    <div className="flex flex-col gap-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">Property <span className="text-rose-500">*</span></label>
                        <input id="property" className="form-input w-full" type="text" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">Value <span className="text-rose-500">*</span></label>
                        <input id="value" className="form-input w-full" type="text" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">Seed <span className="text-rose-500">*</span></label>
                        <input id="seed" className="form-input w-full" type="text" required />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between pt-[16px] pb-[23px] items-center border-b border-slate-200">
                      <span className="block text-sm font-medium">Store data on blockchain</span>
                      <div className="flex items-center">
                        <div className="form-switch">
                          <input type="checkbox" id="switch-1" className="sr-only" checked={toggle} onChange={() => setToggle(!toggle)} />
                            <label className="bg-slate-400" htmlFor="switch-1">
                            <span className="bg-white shadow-sm" aria-hidden="true"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-row justify-end gap-x-2 pt-[18px] pb-[14px] items-end">
                      <button
                        className="btn-sm bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                        onClick={cancelAddForm}
                      >
                        Cansel
                      </button>
                      <button
                        className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                        onClick={cancelAddForm}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="drop-shadow-lg mt-11">
                    {/* Top */}
                    <div className="bg-white rounded-t-xl px-5 pb-2.5 text-center">
                      <div className="mb-3 text-center">
                        <img className="inline-flex w-12 h-12 rounded-full -mt-6" src={Image} width="48" height="48" alt="Transaction 04" />
                      </div>
                      <div className="mt-5 text-2xl font-semibold text-emerald-500 mb-1">0.012 IDN</div>
                      <div className="text-sm font-medium text-slate-800 mb-3">Total amount fee</div>
                    </div>
                    {/* Divider */}
                    <div className="flex justify-between items-center" aria-hidden="true">
                      <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                      <div className="grow w-full h-5 bg-white flex flex-col justify-center">
                        <div className="h-px w-full border-t border-dashed border-slate-200" />
                      </div>
                      <svg className="w-5 h-5 fill-white rotate-180" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                    </div>

                    <div className="bg-white rounded-b-xl p-5 pt-8 pb-10 text-sm space-y-3">
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Validator:</span>
                        <span className="font-medium text-slate-700 text-right">IT17 2207 1010 0504 0006 88</span>
                      </div>
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Recipient:</span>
                        <span className="font-medium text-slate-700 text-right">IT17 2207 1010 0504 0006 88</span>
                      </div>
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Transacion::</span>
                        <span className="font-medium text-slate-700 text-right">145 bytes</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Field change form */}
                <div className={`${!changeFormOpen && 'hidden'}`}>
                  <div className="flex flex-col bg-white px-5 pt-5 pb-6 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80 gap-y-[8px]">
                    <button
                      className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white px-[100px] justify-start"
                      onClick={openRemoveForm}
                      >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                      </svg>
                      <span className="ml-2">Remove</span>
                    </button>
                    <button className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600 px-[100px] justify-start">
                      <svg className="w-4 h-4 fill-rose-500 shrink-0" viewBox="0 0 16 16">
                        <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                      </svg>
                      <span className="ml-2">Update</span>
                    </button>
                    <button className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600 px-[100px] justify-start">
                      <svg className="w-4 h-4 fill-rose-500 shrink-0" viewBox="0 0 16 16">
                        <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                      </svg>
                      <span className="ml-2">Share</span>
                    </button>
                  </div>
                </div>
                {/* Remove form */}
                <div className={`${!removeFormOpen && 'hidden'}`}>
                  <div className="bg-white p-5 pb-[190px] shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                    <h2 className="grow text-base font-semibold text-slate-800 truncate mb-2.5">Summary</h2>
                    <div className="flex flex-col">
                      <span className="text-sm font-normal text-slate-600 py-3 border-b border-slate-200">Second name</span>
                      <span className="text-sm font-normal text-slate-600 py-3 border-b border-slate-200">Birthday</span>
                    </div>
                    <div className="flex flex-row justify-between pt-[16px] pb-[23px] items-center">
                      <span className="block text-sm font-medium">On blockchain too</span>
                      <div className="flex items-center">
                        <div className="form-switch">
                          <input type="checkbox" id="switch-1" className="sr-only" checked={toggle} onChange={() => setToggle(!toggle)} />
                            <label className="bg-slate-400" htmlFor="switch-1">
                            <span className="bg-white shadow-sm" aria-hidden="true"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-row justify-end gap-x-2 pt-[20px] pb-[16px] items-end">
                      <button
                        className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white px-[100px] justify-start"
                        onClick={canselRemoveForm}
                        >
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                          <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                        </svg>
                        <span className="ml-2">Apply</span>
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <span className="text-descriptionSize text-slate-500 font-normal italic text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Terms.</span>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="drop-shadow-lg mt-12">
                    {/* Top */}
                    <div className="bg-white rounded-t-xl px-5 pb-2.5 text-center">
                      <div className="mb-3 text-center">
                        <img className="inline-flex w-12 h-12 rounded-full -mt-6" src={Image} width="48" height="48" alt="Transaction 04" />
                      </div>
                      <div className="mt-5 text-2xl font-semibold text-emerald-500 mb-1">0.012 IDN</div>
                      <div className="text-sm font-medium text-slate-800 mb-3">Total amount fee</div>
                    </div>
                    {/* Divider */}
                    <div className="flex justify-between items-center" aria-hidden="true">
                      <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                      <div className="grow w-full h-5 bg-white flex flex-col justify-center">
                        <div className="h-px w-full border-t border-dashed border-slate-200" />
                      </div>
                      <svg className="w-5 h-5 fill-white rotate-180" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                    </div>
                    <div className="bg-white rounded-b-xl p-5 pt-8 pb-10 text-sm space-y-3">
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Validator:</span>
                        <span className="font-medium text-slate-700 text-right">IT17 2207 1010 0504 0006 88</span>
                      </div>
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Recipient:</span>
                        <span className="font-medium text-slate-700 text-right">IT17 2207 1010 0504 0006 88</span>
                      </div>
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Transacion::</span>
                        <span className="font-medium text-slate-700 text-right">145 bytes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile;