import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ProfileTableItem from '../../partials/digitalId/ProfileTableItem';
import ProfileIcon from '../../images/profile-icon.svg';
import Avatar01 from '../../images/avatar-01.jpg';
import Avatar02 from '../../images/avatar-02.jpg';
import Avatar03 from '../../images/avatar-03.jpg';

function Profile () {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = {
      id: '0',
      image: ProfileIcon,
      value: 'Passport',
      property: 'Document type',
      status: 'Progress',
      transactions: ['0x7234ABC342342352345', '0x5745DEF342342352345'],
      avatars: [Avatar01, Avatar02, Avatar03]
    };

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
            <div className="mb-8">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Profile ✨</h1>
            </div>
             {/* Table */}
             <table className="w-[828px]">
                <tbody className="text-sm">
                  <ProfileTableItem
                    key={data.id}
                    id={data.id}
                    image={data.image}
                    value={data.value}
                    property={data.property}
                    status={data.status}
                    transactions={data.transactions}
                    avatars={data.avatars}
                  />
                </tbody>
              </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile;