import React, {useEffect, useState} from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import User05 from "../../images/user-28-05.jpg";
import User08 from "../../images/user-28-08.jpg";
import User09 from "../../images/user-28-09.jpg";
import User06 from "../../images/user-28-06.jpg";
import User03 from "../../images/user-28-03.jpg";
import User01 from "../../images/user-28-01.jpg";
import {TransactionID} from "../../utils/TransactionID";
import {Link} from "react-router-dom";


function ValidationLog () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transId, setTransId] = useState()

  useEffect(()=>{
    setTransId(TransactionID())
  },[])

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
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Digiatl ID transaction log ✨</h1>
              </div>
              {/*Psosts*/}
              <div className="max-w-3xl m-auto mt-8">
                <div className="xl:-translate-x-16 max-w-fit">
                  {/* Post */}
                  <article className="pt-6">
                    <div className="xl:flex">
                      <div className="w-32 shrink-0">
                        <h2 className="text-xl leading-snug font-bold text-slate-800 xl:leading-7 mb-4 xl:mb-0">Today</h2>
                      </div>
                      <div className="grow pb-6 border-b border-slate-200">
                        <header>
                          <div className="flex flex-nowrap items-center space-x-2 mb-6">
                            {/* Avatars */}
                            <div className="flex shrink-0 -space-x-3 -ml-px">
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User05} width="28" height="28" alt="User 05" />
                              </a>
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User08} width="28" height="28" alt="User 08" />
                              </a>
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User09} width="28" height="28" alt="User 09" />
                              </a>
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User06} width="28" height="28" alt="User 06" />
                              </a>
                            </div>
                            <div className="text-slate-400">·</div>
                          </div>
                        </header>
                        {/* List */}
                        <ul className="-my-2">
                          {/* List item */}
                          <li className="relative py-2">
                            <div className="flex items-center mb-2.5">
                              <div className="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                              <div className="absolute left-0 rounded-full bg-indigo-500" aria-hidden="true">
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
                                  <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
                                </svg>
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 pl-9">
                                Second name by <Link className="font-bold text-indigo-500 hover:text-indigo-600 underline hover:no-underline" to="/digitalId/validation-log">{`0x${transId}`}</Link>
                              </h3>
                            </div>
                            <div className="block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{`0x${transId}`}</div>
                              <span className="font-normal text-[10px]">Transactions ID</span>
                            </div>
                            <div className="mb-3.5 block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{transId}</div>
                              <span className="font-normal text-[10px]">Validated data</span>
                            </div>
                            <Link className="pl-9 font-normal text-sm text-indigo-500 hover:text-indigo-600" to="/digitalId/validation-log">Explore -&gt;</Link>
                          </li>
                          {/* List item */}
                          <li className="relative py-2">
                            <div className="flex items-center mb-1">
                              <div className="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                              <div className="absolute left-0 rounded-full bg-indigo-500" aria-hidden="true">
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
                                  <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
                                </svg>
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 pl-9">
                                First name by <Link className="font-bold text-indigo-500 hover:text-indigo-600 underline hover:no-underline" to="/digitalId/validation-log">{`0x${transId}`}</Link>
                              </h3>
                            </div>
                            <div className="block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{`0x${transId}`}</div>
                              <span className="font-normal text-[10px]">Transactions ID</span>
                            </div>
                            <div className="mb-3.5 block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{transId}</div>
                              <span className="font-normal text-[10px]">Validated data</span>
                            </div>
                            <Link className="pl-9 font-normal text-sm text-indigo-500 hover:text-indigo-600" to="/digitalId/validation-log">Explore -&gt;</Link>
                          </li>
                          {/* List item */}
                          <li className="relative py-2">
                            <div className="flex items-center mb-1">
                              <div className="absolute left-0 rounded-full bg-indigo-500" aria-hidden="true">
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
                                  <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
                                </svg>
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 pl-9">
                                Document name by <Link className="font-bold text-indigo-500 hover:text-indigo-600 underline hover:no-underline" to="/digitalId/validation-log">{`0x${transId}`}</Link>
                              </h3>
                            </div>
                            <div className="block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{`0x${transId}`}</div>
                              <span className="font-normal text-[10px]">Transactions ID</span>
                            </div>
                            <div className="mb-3.5 block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{transId}</div>
                              <span className="font-normal text-[10px]">Validated data</span>
                            </div>
                            <Link className="pl-9 font-normal text-sm text-indigo-500 hover:text-indigo-600" to="/digitalId/validation-log">Explore -&gt;</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </article>

                  {/* Post */}
                  <article className="pt-6">
                    <div className="xl:flex">
                      <div className="w-32 shrink-0">
                        <h2 className="text-xl leading-snug font-bold text-slate-800 xl:leading-7 mb-4 xl:mb-0">Last week</h2>
                      </div>
                      <div className="grow pb-6 border-b border-slate-200">
                        <header>
                          <div className="flex flex-nowrap items-center space-x-2 mb-6">
                            {/* Avatars */}
                            <div className="flex shrink-0 -space-x-3 -ml-px">
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User05} width="28" height="28" alt="User 05" />
                              </a>
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User08} width="28" height="28" alt="User 08" />
                              </a>
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User09} width="28" height="28" alt="User 09" />
                              </a>
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User06} width="28" height="28" alt="User 06" />
                              </a>
                            </div>
                            <div className="text-slate-400">·</div>
                          </div>
                        </header>
                        {/* List */}
                        <ul className="-my-2">
                          {/* List item */}
                          <li className="relative py-2">
                            <div className="flex items-center mb-1">
                              <div className="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                              <div className="absolute left-0 rounded-full bg-indigo-500" aria-hidden="true">
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
                                  <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
                                </svg>
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 pl-9">
                                Gender name by <Link className="font-bold text-indigo-500 hover:text-indigo-600 underline hover:no-underline" to="/digitalId/validation-log">{`0x${transId}`}</Link>
                              </h3>
                            </div>
                            <div className="block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{`0x${transId}`}</div>
                              <span className="font-normal text-[10px]">Transactions ID</span>
                            </div>
                            <div className="mb-3.5 block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{transId}</div>
                              <span className="font-normal text-[10px]">Validated data</span>
                            </div>
                            <Link className="pl-9 font-normal text-sm text-indigo-500 hover:text-indigo-600" to="/digitalId/validation-log">Explore -&gt;</Link>
                          </li>
                          {/* List item */}
                          <li className="relative py-2">
                            <div className="flex items-center mb-1">
                              <div className="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                              <div className="absolute left-0 rounded-full bg-[#ff0000] w-5 h-5" aria-hidden="true" />
                              <h3 className="text-lg font-bold text-slate-800 pl-9">
                                Second name Updated
                              </h3>
                            </div>
                            <div className="block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{`0x${transId}`}</div>
                              <span className="font-normal text-[10px]">Transactions ID</span>
                            </div>
                            <div className="mb-3.5 block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{transId}</div>
                              <span className="font-normal text-[10px]">Validated data</span>
                            </div>
                            <Link className="pl-9 font-normal text-sm text-indigo-500 hover:text-indigo-600" to="/digitalId/validation-log">Explore -&gt;</Link>
                          </li>
                          {/* List item */}
                          <li className="relative py-2">
                            <div className="flex items-center mb-1">
                              <div className="absolute left-0 rounded-full bg-indigo-500" aria-hidden="true">
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
                                  <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
                                </svg>
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 pl-9">
                                Gender name by <Link className="font-bold text-indigo-500 hover:text-indigo-600 underline hover:no-underline" to="/digitalId/validation-log">{`0x${transId}`}</Link>
                              </h3>
                            </div>
                            <div className="block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{`0x${transId}`}</div>
                              <span className="font-normal text-[10px]">Transactions ID</span>
                            </div>
                            <div className="mb-3.5 block text-slate-800 w-fit pl-9">
                              <div className="text-base font-semibold underline mb-[-10px]">{transId}</div>
                              <span className="font-normal text-[10px]">Validated data</span>
                            </div>
                            <Link className="pl-9 font-normal text-sm text-indigo-500 hover:text-indigo-600" to="/digitalId/validation-log">Explore -&gt;</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </article>

                  {/* Post */}
                  <article className="pt-6">
                    <div className="xl:flex">
                      <div className="w-32 shrink-0">
                        <h2 className="text-xl leading-snug font-bold text-slate-800 xl:leading-7 mb-4 xl:mb-0">Even earlier</h2>
                      </div>
                      <div className="grow pb-6 border-b border-slate-200">
                        <header>
                          <div className="flex flex-nowrap items-center space-x-2 mb-6">
                            {/* Avatars */}
                            <div className="flex shrink-0 -space-x-3 -ml-px">
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User03} width="28" height="28" alt="User 03" />
                              </a>
                              <a className="block" href="#0">
                                <img className="rounded-full border-2 border-white box-content" src={User01} width="28" height="28" alt="User 01" />
                              </a>
                            </div>
                            <div className="text-slate-400">·</div>
                          </div>
                        </header>
                        {/* List */}
                        <ul className="-my-2">
                          {/* List item */}
                          <li className="relative py-2">
                            <div className="flex items-center mb-1">
                              <div className="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                              <div className="absolute left-0 rounded-full bg-white" aria-hidden="true">
                                <svg className="w-5 h-5 fill-current text-slate-400" viewBox="0 0 20 20">
                                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z" />
                                </svg>
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 pl-9">Product V1 - Early Access</h3>
                            </div>
                            <div className="pl-9">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                          </li>
                          {/* List item */}
                          <li className="relative py-2">
                            <div className="flex items-center mb-1">
                              <div className="absolute left-0 rounded-full bg-white" aria-hidden="true">
                                <svg className="w-5 h-5 fill-current text-slate-400" viewBox="0 0 20 20">
                                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z" />
                                </svg>
                              </div>
                              <h3 className="text-lg font-bold text-slate-800 pl-9">Web3 Compatibility</h3>
                            </div>
                            <div className="pl-9">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </main>

        </div>
      </div>
  )
}

export default ValidationLog;
