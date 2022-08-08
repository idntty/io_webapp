import React, {useState} from 'react';
import ValidateRoadMap from "../../partials/validationLog/ValidateRoadMap";
import {observer} from "mobx-react-lite";
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import {store} from "../../store/store";

const ValidationLog = observer(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              {/* Page header */}
              <div className="pb-8 border-b border-zinc-200">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Digital ID transaction log ✨</h1>
              </div>
              {/*Psosts*/}
              <div className="max-w-3xl m-auto mt-6">
                <div className="xl:-translate-x-16 max-w-fit">
                  {/* PostsID */}
                  {store.transactionsInfo.map(item => {
                    return <ValidateRoadMap season={item} key={item.id}/>
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  )
})

export default ValidationLog;
