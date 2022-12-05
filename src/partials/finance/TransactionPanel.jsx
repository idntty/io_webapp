import React, { useEffect, useRef, useState } from 'react';

import Image from '../../images/transactions-image-04.svg';
import moment from 'moment';
import { formatAddressBig } from '../../utils/Utils';
import { generateSvgAvatar } from '../../images/GenerateOnboardingSvg/GenerateSvg';
import { store } from '../../store/store';
import UserAvatar from '../../images/user-avatar-32.png';
import { observer } from 'mobx-react-lite';

const TransactionPanel = observer(
  ({ transactionPanelOpen, onClose, delegate, postTransaction }) => {
    const closeBtn = useRef(null);
    const panelContent = useRef(null);

    const [amount, setAmount] = useState(0);

    const statusColor = () => {
      switch (delegate.status) {
        case 'Vote':
          return 'bg-emerald-100 text-emerald-600';
        case 'Unvote':
          return 'bg-rose-100 text-rose-500';
        default:
          return 'bg-slate-100 text-slate-500';
      }
    };

    const amountLabel =
      delegate.status === 'Vote' ? 'Voiting amount' : 'Unvoiting amount';

    // close if the esc key is pressed
    useEffect(() => {
      const keyHandler = ({ keyCode }) => {
        if (!transactionPanelOpen || keyCode !== 27) return;
        onClose();
      };
      document.addEventListener('keydown', keyHandler);
      return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
      const status = delegate.status;

      if (status === 'Unvote') {
        setAmount(store.accountSentVotes[delegate.address].toString());
      }
    }, [delegate]);

    return (
      <div
        ref={panelContent}
        className={`absolute inset-0 sm:left-auto z-20 transform shadow-xl transition-transform duration-200 ease-in-out ${
          transactionPanelOpen ? 'translate-x-' : 'translate-x-full'
        }`}
      >
        <div className="sticky top-16 bg-slate-50 overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-l border-slate-200 w-full sm:w-[390px] h-[calc(100vh-64px)]">
          <button
            ref={closeBtn}
            onClick={() => onClose()}
            className="absolute top-0 right-0 mt-6 mr-6 group p-2"
          >
            <svg
              className="w-4 h-4 fill-slate-400 group-hover:fill-slate-600 pointer-events-none"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z" />
            </svg>
          </button>
          <div className="py-8 px-4 lg:px-8">
            <div className="max-w-sm mx-auto lg:max-w-none">
              <div className="text-slate-800 font-semibold text-center mb-1">
                Vote Transaction
              </div>
              <div className="text-sm text-center italic">
                {moment().format('DD/MM/YYYY hh:mm A')}
              </div>
              {/* Details */}
              <div className="drop-shadow-lg mt-12">
                {/* Top */}
                <div className="bg-white rounded-t-xl px-5 pb-2.5 text-center">
                  <div className="mb-3 text-center">
                    <img
                      className="inline-flex w-12 h-12 rounded-full -mt-6"
                      src={Image}
                      width="48"
                      height="48"
                      alt="Transaction 04"
                    />
                  </div>
                  <div
                    className={`text-2xl font-semibold mb-1 ${statusColor()} bg-transparent`}
                  >
                    {amount}/idn
                  </div>
                  <div className="text-sm font-medium text-slate-800 mb-3">
                    {delegate?.dpos?.delegate?.username ||
                      formatAddressBig(delegate.address || '')}
                  </div>
                  <div
                    className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor()} justify-center`}
                    style={{ minWidth: '84px' }}
                  >
                    {delegate.status}
                  </div>
                </div>
                {/* Divider */}
                <div
                  className="flex justify-between items-center"
                  aria-hidden="true"
                >
                  <svg
                    className="w-5 h-5 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                  </svg>
                  <div className="grow w-full h-5 bg-white flex flex-col justify-center">
                    <div className="h-px w-full border-t border-dashed border-slate-200" />
                  </div>
                  <svg
                    className="w-5 h-5 fill-white rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                  </svg>
                </div>
                {/* Bottom */}
                <div className="bg-white rounded-b-xl p-5 pt-2.5 text-sm space-y-3">
                  <div className="flex justify-between space-x-1">
                    <span className="italic">ADDRESS:</span>
                    <span className="font-medium text-slate-700 text-right">
                      {formatAddressBig(delegate.address || '')}
                    </span>
                  </div>
                  <div className="flex justify-between space-x-1">
                    <span className="italic">FEE:</span>
                    <span className="font-medium text-slate-700 text-right">
                      145/idn
                    </span>
                  </div>
                  <div className="flex justify-between space-x-1">
                    <span className="italic">Nonce:</span>
                    <span className="font-medium text-slate-700 text-right">
                      {delegate?.sequence?.nonce}
                    </span>
                  </div>
                  <div className="flex justify-between space-x-1">
                    <span className="italic">Sender:</span>
                    <span className="font-medium text-slate-700 text-right">
                      {formatAddressBig(store.address)}
                    </span>
                  </div>
                </div>
              </div>
              {/* Receipts */}
              <div className="mt-6">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="mandatory"
                >
                  {amountLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="amount"
                  className="form-input w-full"
                  type="number"
                  required
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </div>
              {/* Notes */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-slate-800 mb-2">
                  Transaction details
                </div>
                <div className="flex p-2 justify-between items-center border border-slate-300 rounded-md">
                  <div className="flex gap-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={generateSvgAvatar(store.pubKey) || UserAvatar}
                      width="32"
                      height="32"
                      alt="User"
                    />
                    <div className="flex items-center text-sm text-slate-700">
                      Balance
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    {store.accountBalance}/idn
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-6">
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                  onClick={() => {
                    postTransaction(
                      delegate.address,
                      BigInt(delegate.status === 'Vote' ? amount : amount * -1)
                    );
                    onClose();
                  }}
                >
                  <span className="hidden xs:block">Post Transaction</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default TransactionPanel;
