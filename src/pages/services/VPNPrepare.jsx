import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import VPNServiceImg from '../../images/vpn_service.png';
import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';

const VPNPrepare = observer(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    store.fetchVPNServers();
  }, []);

  const navigate = useNavigate();

  const canVote = store.accountBalance > 20;

  const clickButton = () => {
    if (canVote) navigate('/services/delegates');
    else window.open('https://testnet.idntty.org/faucet', '_blank');
  };

  useEffect(() => {
    if (store.canVPN) navigate('/services/vpn/servers');
  }, [store.canVPN]);

  if (store.loading && !store.canVPN) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="lg:relative lg:flex border-b border-slate-200">
            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    VPN Service✨
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center py-16">
            <div className="flex w-2/4 flex-col gap-2 justify-center items-center">
              <img
                width="64"
                height="64"
                src={VPNServiceImg}
                alt="VPN service"
              />
              <h2 className="text-xl md:text-2xl text-slate-800 font-bold text-center">
                {canVote
                  ? 'Vote for VPN delegate to get service'
                  : 'You cannot get the VPN service, sorry 😢'}
              </h2>
              <p className="text-gray-600 text-center">
                {canVote ? (
                  'The tokens used for voting are locked, which means that they still belong to you but they cannot be used for transactions. The funds are locked for as long as you are voting using these tokens and you are able to unlock them any time you want, by removing them from the votes.'
                ) : (
                  <>
                    Only users who can vote for a VPN delegate using{' '}
                    <b>at least 19.9 tokens</b> can use this service.
                    Unfortunately, your account currently has{' '}
                    <b>only {store.accountBalance} tokens</b>, which is not
                    enough to vote.
                  </>
                )}
              </p>
              <button
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white max-w-fit"
                onClick={clickButton}
              >
                <svg
                  className="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden xs:block mx-6">
                  {canVote ? 'Vote' : 'Get It'}
                </span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
});

export default VPNPrepare;
