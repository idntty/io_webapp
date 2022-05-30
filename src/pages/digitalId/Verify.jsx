import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

function Verify () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const verifiedData = [
    {
      id: 0,
      time: '10:48',
      property: 'Residence',
      value: 'United Kindom',
      validatedData: '7234ABC3423423523457234ABC34234'
    },
    {
      id: 1,
      time: '10:48',
      property: 'Document ID',
      value: 'A1321313',
      validatedData: '4568ABC3423423523457234ABC34234'
    },
    {
      id: 2,
      time: '10:48',
      property: 'Document ID',
      value: 'A3451313',
      validatedData: '9584ABC3423423523457234ABC34234'
    },
    {
      id: 3,
      time: '03:00',
      property: 'Residence',
      value: 'Holland',
      validatedData: '1024ABC3423423523457234ABC34234'
    },
    {
      id: 4,
      time: '03:00',
      property: 'Document ID',
      value: 'B3451313',
      validatedData: '7893ABC3423423523457234ABC34234'
    },
    {
      id: 5,
      time: '03:00',
      property: 'Document ID',
      value: 'A3451313',
      validatedData: '7286ABC3423423523457234ABC34234'
    },
    {
      id: 6,
      time: '10:00',
      property: 'Residence',
      value: 'China',
      validatedData: '0000ABC3423423523457234ABC34234'
    },
    {
      id: 7,
      time: '10:00',
      property: 'Document ID',
      value: 'C3451313',
      validatedData: '1230ABC3423423523457234ABC34234'
    },
    {
      id: 8,
      time: '10:00',
      property: 'Document ID',
      value: 'D3451313',
      validatedData: '4483ABC3423423523457234ABC34234'
    }
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-11 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="mb-11">
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
            </div>
            {/* Blocks */}
            {verifiedData.sort((first, second) => {
              if (first.time < second.time) {
                return -1;
              }
              if (first.time > second.time) {
                return 1;
              }
              if (first.time === second.time) {
                return 0;
              }
            })}
            <div className="w-[1095px] pl-5 pr-[13px] py-3 bg-white border border-slate-200 rounded shadow-[0_4px_6px_-1px_rgba(5,23,42,0.08)]">
              {/* Header */}
              <div className="flex justify-between">
                <span className="font-normal text-descriptionSize text-slate-500" >
                  Yesterday at 10:48 AM
                </span>
                {/* Buttons */}
                <div className="flex gap-x-[6px]">
                  <div className="flex items-center">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="sr-only">Link</span>
                      <svg className="w-4 h-4 fill-current shrink-0 text-slate-400" viewBox="0 0 16 16">
                        <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button
                        className={`text-slate-400 hover:text-slate-500 transform ${descriptionOpen && 'rotate-180'}`}
                        aria-expanded={descriptionOpen}
                    >
                      <span className="sr-only">Show more</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
                <div className='flex gap-y-2'>
                  <div className='flex flex-col'>
                    <div className='flex flex-row items-center'>
                      <span className='font-semibold text-slate-800 text-base w-[204px]'>United Kindom</span>
                      <span className='font-semibold text-descriptionSize text-slate-600 underline w-80'>7234ABC3423423523457234ABC34234</span>
                      <span className='font-semibold text-descriptionSize text-slate-600 underline w-80'>7234ABC3423423523457234ABC34234</span>
                    </div>
                    <span className='font-normal text-xxs'>Residence</span>
                  </div>
                </div>  
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Verify;