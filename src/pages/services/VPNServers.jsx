import React, { useEffect, useMemo, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { QRCodeSVG } from 'qrcode.react';

import VPNServeIcon from '../../images/vpn_server_icon.png';
import { Filters } from '../../components/Filters';

const filters = {
  'View All': '',
  Active: 'Active',
  Offline: 'Offline',
};

function VPNServers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('View All');

  const qrContent = useMemo(
    () => `
[Interface]
PrivateKey = ${store.vpnPrivateKey}
Address = ${store.vpnServers?.[selectedServer]?.address}
DNS = ${store.vpnServers?.[selectedServer]?.dns}

[Peer]
PublicKey = ${store.vpnServers?.[selectedServer]?.publicKey}
AllowedIPs = 0.0.0.0/0
Endpoint = ${store.vpnServers?.[selectedServer]?.endpoint}
`,
    [store.vpnServers, store.vpnPrivateKey]
  );

  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([qrContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'vpnConfig.conf';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  useEffect(() => {
    store.fetchVPNServers();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="lg:relative lg:flex">
            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-5">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    Servers ✨
                  </h1>
                </div>
              </div>

              {/* Filters */}
              <Filters
                value={currentFilter}
                values={Object.keys(filters)}
                onChange={setCurrentFilter}
              />

              {/* Credit cards */}
              <div className="space-y-2">
                {store.vpnServers?.map((e, i) => (
                  <label
                    className="relative block cursor-pointer text-left w-full"
                    onClick={() => setSelectedServer(i)}
                    key={e.publicKey}
                  >
                    <input
                      type="radio"
                      name="radio-buttons"
                      className="peer sr-only"
                      checked={i === selectedServer}
                      onChange={() => {}}
                    />
                    <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                      <div className="grid grid-cols-12 items-center gap-x-2">
                        {/* Card */}
                        <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
                          <img
                            src={VPNServeIcon}
                            width="36"
                            height="36"
                            alt="VPN Country"
                          />
                          <div>
                            <div className="text-sm font-medium text-slate-800">
                              {e.endpoint}
                            </div>
                            <div className="text-xs">{e.publicKey}</div>
                          </div>
                        </div>
                        {/* Card limits */}
                        <div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-6">
                          <div className="text-sm">4673,00 Mb / 473,00 Mb</div>
                        </div>
                        {/* Card status */}
                        <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                          <div className="text-xs inline-flex font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1">
                            Active
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                      aria-hidden="true"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[390px] lg:h-[calc(100vh-64px)]">
                <div className="py-8 px-4 lg:px-8 h-full">
                  <div className="max-w-sm mx-auto lg:max-w-none flex flex-col justify-between h-full">
                    <div>
                      <div className="text-slate-800 font-semibold text-center mb-6">
                        Physical Metal Card
                      </div>

                      {/* Credit Card */}
                      <div className="flex justify-center">
                        <QRCodeSVG
                          value={qrContent}
                          size={200}
                          includeMargin
                          level="L"
                        />
                      </div>

                      {/* Details */}
                      <div className="mt-6">
                        <div className="text-sm font-semibold text-slate-800 mb-1">
                          Details
                        </div>
                        <ul>
                          <li className="flex items-center justify-between py-3 border-b border-slate-200">
                            <div className="text-sm">Server address</div>
                            <div className="text-sm font-medium text-slate-800 ml-2">
                              {store.vpnServers?.[selectedServer]?.endpoint}
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 border-b border-slate-200">
                            <div className="text-sm">Status</div>
                            <div className="flex items-center whitespace-nowrap">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                              <div className="text-sm font-medium text-slate-800">
                                Active
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* Payment Limits */}
                      <div className="mt-6">
                        <div className="text-sm font-semibold text-slate-800 mb-4">
                          Transfer
                        </div>
                        <div className="pb-4 border-b border-slate-200">
                          <div className="flex justify-between text-sm mb-2">
                            <div>Spent This Month</div>
                            <div className="italic">
                              4673,00 Mb{' '}
                              <span className="text-slate-400">/</span> 46730,00
                              Mb
                            </div>
                          </div>
                          <div className="relative w-full h-2 bg-slate-300">
                            <div
                              className="absolute inset-0 bg-indigo-500"
                              aria-hidden="true"
                              style={{ width: '10%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600"
                      onClick={downloadTxtFile}
                    >
                      <svg
                        className="w-4 h-4 fill-current text-slate-400 shrink-0 rotate-180"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 4c-.3 0-.5.1-.7.3L1.6 10 3 11.4l4-4V16h2V7.4l4 4 1.4-1.4-5.7-5.7C8.5 4.1 8.3 4 8 4ZM1 2h14V0H1v2Z" />
                      </svg>
                      <span className="ml-2">Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VPNServers;
