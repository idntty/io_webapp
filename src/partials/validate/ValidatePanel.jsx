import React from 'react';

import Image from '../../images/transactions-image-04.svg';

function TransactionPanel({
  validatePanelOpen,
  setValidatePanelOpen
}) {

  return (
      <div
          className={`absolute inset-0 sm:left-auto z-20 transition-transform duration-200 ease-in-out ${
              validatePanelOpen ? 'translate-x-' : 'translate-x-full'
          }`}>
        <div className="top-16 bg-gradient-to-b from-[#e4eaf0] to-white shrink-0 border-l border-slate-200 w-full sm:w-[390px] h-fit">
          <button
              onClick={() => setValidatePanelOpen(false)}
              className="absolute top-0 right-0 mt-6 mr-6 group p-2"
          >
            <svg className="w-4 h-4 fill-slate-400 group-hover:fill-slate-600 pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z" />
            </svg>
          </button>
          <div className="py-8 px-4 lg:px-8">
            <div className="max-w-sm mx-auto lg:max-w-none">
              <div className="text-slate-800 font-semibold text-center mb-1">Bank Transfer</div>
              <div className="text-sm text-center italic">22/01/2022, 8:56 PM</div>
              {/* Details */}
              <div className="drop-shadow-lg mt-12">
                {/* Top */}
                <div className="bg-white rounded-t-xl px-5 pb-2.5 text-center">
                  <div className="mb-3 text-center">
                    <img className="inline-flex w-12 h-12 rounded-full -mt-6" src={Image} width="48" height="48" alt="Transaction 04" />
                  </div>
                  <div className="mt-5 text-2xl font-semibold text-emerald-500 mb-1">0.012 IDN</div>
                  <div className="text-sm font-medium text-slate-800 mb-3">Total amount fee</div>
                </div>
                {/* Divider */}
                <div className="flex justify-between items-center" aria-hidden="true">
                  <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                  </svg>
                  <div className="grow w-full h-5 bg-white flex flex-col justify-center">
                    <div className="h-px w-full border-t border-dashed border-slate-200" />
                  </div>
                  <svg className="w-5 h-5 fill-white rotate-180" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                  </svg>
                </div>
                {/* Bottom */}
                <div className="bg-white rounded-b-xl p-5 pt-8 pb-10 text-sm space-y-3">
                  <div className="flex justify-between space-x-1">
                    <span className="italic">Validator:</span>
                    <span className="font-medium text-slate-700 text-right">IT17 2207 1010 0504 0006 88</span>
                  </div>
                  <div className="flex justify-between space-x-1">
                    <span className="italic">Recipient:</span>
                    <span className="font-medium text-slate-700 text-right">IT17 2207 1010 0504 0006 88</span>
                  </div>
                  <div className="flex justify-between space-x-1">
                    <span className="italic">Transaction:</span>
                    <span className="font-medium text-slate-700 text-right">145 bytes</span>
                  </div>
                </div>
              </div>
              {/* Receipts */}
              <div className="mt-6">
                <div className="text-sm font-medium text-slate-800 mb-2">Private Data</div>
                <form className="rounded bg-slate-50 border border-dashed border-slate-300 text-center px-5 py-8">
                  <svg className="inline-flex w-4 h-4 fill-slate-400 mb-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4c-.3 0-.5.1-.7.3L1.6 10 3 11.4l4-4V16h2V7.4l4 4 1.4-1.4-5.7-5.7C8.5 4.1 8.3 4 8 4ZM1 2h14V0H1v2Z" />
                  </svg>
                  <label htmlFor="upload" className="block text-sm text-slate-400 italic">Upload exported JSON data</label>
                  <input className="sr-only" id="upload" type="file" />
                </form>
              </div>
              {/* Notes */}
              <div className="mt-6">
                <div className="text-sm font-medium text-slate-800 mb-2">Notes</div>
                <form>
                  <label className="sr-only" htmlFor="notes">Write a note</label>
                  <textarea id="notes" className="resize-none form-textarea w-full focus:border-slate-300" rows="4" placeholder="Write a note…" defaultValue={""} />
                </form>
              </div>
              {/* Download / Report */}
              <div className="flex items-center space-x-3 mt-[84px]">
                <div className="w-1/2">
                  <button className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600">
                    <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 rotate-180" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4c-.3 0-.5.1-.7.3L1.6 10 3 11.4l4-4V16h2V7.4l4 4 1.4-1.4-5.7-5.7C8.5 4.1 8.3 4 8 4ZM1 2h14V0H1v2Z" />
                    </svg>
                    <span className="ml-2 text-sm font-medium">Validate</span>
                  </button>
                </div>
                <div className="w-1/2">
                  <button className="btn w-full border-slate-200 hover:border-slate-300 text-rose-500">
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                      <path d="M7.001 3h2v4h-2V3Zm1 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM15 16a1 1 0 0 1-.6-.2L10.667 13H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1ZM2 11h9a1 1 0 0 1 .6.2L14 13V2H2v9Z" />
                    </svg>
                    <span className="ml-2 text-sm font-medium">Invalidate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default TransactionPanel;
