import React from 'react';
import TransactionItem from './TransactionsTableItem';

import Image01 from '../../images/transactions-image-01.svg';
import { observer } from 'mobx-react-lite';

const TransactionsTable = observer(({ data, rowClick, lockedFor }) => {
  return (
    <div className="bg-white">
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 border-t border-b border-slate-200">
              <tr>
                <th className="px-4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Delegate</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Service</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Balance</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Voted Total</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center"></div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">
                    {lockedFor === 'Voiting' ? 'Sent Votes' : 'Blocked votes'}
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 border-b border-slate-200">
              {data.map((delegate) => {
                return (
                  <TransactionItem
                    key={delegate.address}
                    id={delegate.address}
                    image={Image01}
                    balance={delegate?.token?.balance}
                    name={delegate.dpos?.delegate?.username || delegate.address}
                    total={delegate.dpos?.delegate?.totalVotesReceived || ''}
                    hasSevice={
                      delegate.dpos?.delegate?.username === 'delegate_0'
                    }
                    date={delegate.date}
                    displayReturn={lockedFor === 'Unlocking'}
                    status={delegate.status}
                    amount={
                      (lockedFor === 'Voiting'
                        ? store.accountSentVotes[delegate.address]
                        : store.accountLockedVotesCanReturnSum[
                            delegate.address
                          ]) || ''
                    }
                    handleClick={() =>
                      lockedFor === 'Voiting' && rowClick(delegate)
                    }
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default TransactionsTable;
