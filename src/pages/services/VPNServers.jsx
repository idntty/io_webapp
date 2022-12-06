import React, { useEffect, useMemo, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { QRCodeSVG } from 'qrcode.react';

import VPNServeIcon from '../../images/vpn_server_icon.png';
import { Filters } from '../../components/Filters';
import { observer } from 'mobx-react-lite';
import ReactCountryFlag from 'react-country-flag';
import Transition from '../../utils/Transition';

const filters = {
  'View All': 'all',
  Active: true,
  Offline: false,
};

const VPNServers = observer(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('View All');

  const servers = useMemo(() => {
    if (filters[currentFilter] === 'all') return store.vpnServers;
    return store.vpnServers.filter((e) => e.state === filters[currentFilter]);
  }, [store.vpnServers, currentFilter]);

  const qrContent = useMemo(
    () => `
[Interface]
PrivateKey = ${store.vpnPrivateKey}
Address = ${servers?.[selectedServer]?.address}
DNS = ${servers?.[selectedServer]?.dns || '1.1.1.1'}

[Peer]
PublicKey = ${servers?.[selectedServer]?.serverPublickKey}
AllowedIPs = 0.0.0.0/0
Endpoint = ${servers?.[selectedServer]?.endpoint}
PersistentKeepalive = 25
`,
    [servers, store.vpnPrivateKey, selectedServer]
  );

  useEffect(() => {
    setSelectedServer(0);
  }, [currentFilter]);

  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([qrContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'IDNTTY-' + servers?.[selectedServer]?.country + '.conf';
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
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl">
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
                {servers?.map((e, i) => (
                  <label
                    className="relative block cursor-pointer text-left w-full"
                    onClick={() => setSelectedServer(i)}
                    key={e.serverPublickKey}
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
                        <div className="col-span-6 order-1 sm:order-none flex items-center space-x-4 ">
                          <ReactCountryFlag
                            countryCode={e.shortCountry}
                            svg
                            style={{ width: '36px', height: 'auto' }}
                          />
                          <div>
                            <div className="text-sm font-medium text-slate-800">
                              {e.endpoint}
                            </div>
                            <div className="text-xs">{e.serverPublickKey}</div>
                          </div>
                        </div>
                        {/* Card limits */}
                        <div className="col-span-3 order-1 sm:order-none text-right sm:text-center">
                          <div className="text-sm">
                            {e.transferSum} / 50.00 GB
                          </div>
                        </div>
                        {/* Card status */}
                        <div className="col-span-3 order-2 sm:order-none text-right">
                          {e?.state ? (
                            <div className="text-xs inline-flex font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1">
                              Active
                            </div>
                          ) : (
                            <div className="text-xs inline-flex font-medium bg-amber-100 text-amber-600 rounded-full text-center px-2.5 py-1">
                              Offline
                            </div>
                          )}
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

            <Transition
              show={servers?.length > 0 && servers?.[selectedServer]?.state}
              enter="transition-transform duration-200 ease-in"
              enterStart="translate-x-full"
              enterEnd="translate-x-"
              leave="transition-transform duration-200 ease-out"
              leaveStart="translate-x-"
              leaveEnd="translate-x-full"
            >
              <div className="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[390px] lg:h-[calc(100vh-64px)]">
                <div className="py-8 px-4 lg:px-8 h-full">
                  <div className="max-w-sm mx-auto lg:max-w-none flex flex-col justify-between h-full">
                    <div>
                      <div className="text-slate-800 font-semibold text-center mb-6">
                        {servers?.[selectedServer]?.country} -{' '}
                        {servers?.[selectedServer]?.region}
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
                              {servers?.[selectedServer]?.endpoint}
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 border-b border-slate-200">
                            <div className="text-sm">Status</div>
                            <div className="flex items-center whitespace-nowrap">
                              {servers?.[selectedServer]?.state ? (
                                <>
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                                  <div className="text-sm font-medium text-slate-800">
                                    Active
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="w-2 h-2 rounded-full mr-2 bg-amber-500" />
                                  <div className="text-sm font-medium text-slate-800">
                                    Offline
                                  </div>
                                </>
                              )}
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
                              {servers?.[selectedServer]?.transferSum}{' '}
                              <span className="text-slate-400">/</span> 50.00 GB
                            </div>
                          </div>
                          <div className="relative w-full h-2 bg-slate-300">
                            <div
                              className="absolute inset-0 bg-indigo-500"
                              aria-hidden="true"
                              style={{
                                width: `${servers?.[selectedServer]?.trafficUsed}%`,
                              }}
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
            </Transition>
          </div>
        </main>
      </div>
    </div>
  );
});

export default VPNServers;
