import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ProfileTable from '../../partials/digitalId/ProfileTable';

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
                  <div className="flex flex-row justify-between my-5 items-center">
                    <span className="block text-sm font-medium">Store data on blockchain</span>
                    {/* Start */}
                    <div className="flex items-center">
                      <div className="form-switch">
                        <input type="checkbox" id="switch-1" className="sr-only" checked={toggle} onChange={() => setToggle(!toggle)} />
                          <label className="bg-slate-400" htmlFor="switch-1">
                          <span className="bg-white shadow-sm" aria-hidden="true"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* End */}
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