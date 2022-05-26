import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ValidateTable from "../../partials/validate/ValidateTable";
import ValidatePanel from "../../partials/validate/ValidatePanel";
import ValidateRoadMap from "../../partials/validationlog/ValidateRoadMap";
import {TransactionID} from "../../utils/TransactionID";
import {Link} from "react-router-dom";
import User06 from "../../images/user-28-06.jpg";
import User08 from "../../images/user-28-08.jpg";
import User09 from "../../images/user-28-09.jpg";
import User05 from "../../images/user-28-05.jpg";

function Validate () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [validatePanelOpen, setValidatePanelOpen] = useState(true);

  const validateItems = [
    {
      id: '40',
      name: 'Today',
      transid: TransactionID(),
      usersImges: [
        {
          img: User06,
          imgId: "343"
        },
        {
          img: User08,
          imgId: "345"
        },
        {
          img: User09,
          imgId: "321"
        },
        {
          img: User05,
          imgId: "387"
        },
      ],
      items: [
        {
          seasonId: TransactionID(),
          id: '555',
          trunsText: 'Second name for',
          checked: true
        },
        {
          seasonId: TransactionID(),
          id: '534',
          trunsText: 'Gender name for',
          checked: true
        },
        {
          seasonId: TransactionID(),
          id: '567',
          trunsText: 'Document ID name for',
          checked: true
        },
      ]
    },
  ];

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
            <div className="w-fit">
            {/* Page header */}
              <div className="pb-2.5">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">0x28394710234192304719234</h1>
              </div>
              <Link className="font-normal text-sm text-indigo-500 hover:text-indigo-600" to="/digitalId/validate">Explore -&gt;</Link>
              <div className="mb-5 mt-5">
                <ul className="flex flex-wrap -m-1">
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                      View All
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                      Completed
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                      Pending
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                      Canceled
                    </button>
                  </li>
                </ul>
              </div>
              <ValidateTable setValidatePanelOpen={setValidatePanelOpen}/>
              <div className="pb-8 border-b border-zinc-200 mt-12">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Digiatl ID validation log ✨</h1>
              </div>
              {validateItems.map(item => {
                return <ValidateRoadMap trunsSeason={item} key={item.id}/>
              })}
            </div>
          </div>
          <ValidatePanel validatePanelOpen={validatePanelOpen} setValidatePanelOpen={setValidatePanelOpen}/>
        </main>

      </div>
    </div>
  )
}

export default Validate;
