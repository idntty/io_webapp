import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ProfileTable from '../../partials/digitalId/ProfileTable';
import Image from '../../images/transactions-image-04.svg';

function Profile () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toggle, setToggle] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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
                <ProfileTable/>
              </div>
              {/* Sidebar */}
              <div>
                {/* Form */}
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
                    <button className="btn-sm bg-white border-slate-200 hover:bg-slate-50 text-slate-600">Cansel</button>
                    <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Send</button>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile;