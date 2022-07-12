import React, { useState } from 'react';
import {observer} from "mobx-react-lite";

import {validationLogStore} from "../../store/validationLogStore";
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ValidateTable from "../../partials/validate/ValidateTable";
import ValidatePanel from "../../partials/validate/ValidatePanel";
import ValidateRoadMap from "../../partials/validationlog/ValidateRoadMap";
import {Link} from "react-router-dom";

const Validate = observer(()=>{
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [validatePanelOpen, setValidatePanelOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative">
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
                      Correct
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                      Incorect
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                      Missed
                    </button>
                  </li>
                </ul>
              </div>
              <ValidateTable setValidatePanelOpen={setValidatePanelOpen}/>
              <div className="pb-8 border-b border-zinc-200 mt-[50px]">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Digital ID validation log ✨</h1>
              </div>
              {validationLogStore.transactionData.map(item => {
                return <ValidateRoadMap season={item} key={item.id}/>
              })}
            </div>
          </div>
          <ValidatePanel validatePanelOpen={validatePanelOpen} setValidatePanelOpen={setValidatePanelOpen}/>
        </main>
      </div>
    </div>
  )
})

export default Validate;
