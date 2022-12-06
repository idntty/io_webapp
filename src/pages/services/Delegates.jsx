import React, { useEffect, useMemo, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DropdownTransaction from '../../components/DropdownTransaction';
import TransactionsTable from '../../partials/finance/TransactionsTable';
import PaginationClassic from '../../components/PaginationClassic';
import { observer } from 'mobx-react-lite';
import TransactionPanel from '../../partials/finance/TransactionPanel';
import { Filters } from '../../components/Filters';

const filters = {
  'View All': 'all',
  Voted: 'Unvote',
  Pending: 'Pending',
};

const Delegates = observer(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDelegate, setCurrentDelegate] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('View All');

  const [lockedFor, setLockedFor] = useState('Voiting');

  const delegates = useMemo(() => {
    if (filters[currentFilter] === 'all') return store.delegates;
    return store.delegates.filter((e) => e.status === filters[currentFilter]);
  }, [store.delegates, currentFilter]);

  const lockedLabel = (
    lockedFor === 'Voiting'
      ? Object.values(store.accountSentVotes)
      : Object.values(store.accountLockedVotesCanReturn)
          .flat()
          .map((e) => e.amount)
  )
    .reduce((sum, e) => sum + e, 0n)
    .toString();

  useEffect(() => {
    store.fetchDelegates(0);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="overflow-auto">
          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-4 md:mb-2">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  {lockedLabel}
                  /idn
                </h1>
              </div>
            </div>

            <div className="mb-5">
              <span>Locked for </span>
              <DropdownTransaction value={lockedFor} onChange={setLockedFor} />
            </div>

            {/* Filters */}
            <Filters
              value={currentFilter}
              values={Object.keys(filters)}
              onChange={setCurrentFilter}
            />

            {/* Table */}
            <TransactionsTable
              data={delegates}
              lockedFor={lockedFor}
              rowClick={(delegate) => setCurrentDelegate(delegate)}
            />

            {/*/!* Pagination *!/*/}
            {/*<div className="mt-8">*/}
            {/*  <PaginationClassic*/}
            {/*    count={store.delegatesMeta.count}*/}
            {/*    limit={store.delegatesMeta.limit}*/}
            {/*    offset={store.delegatesMeta.offset}*/}
            {/*    onNextPage={() => setFetchOffset((prev) => prev + 10)}*/}
            {/*    onPrevPage={() => setFetchOffset((prev) => prev - 10)}*/}
            {/*  />*/}
            {/*</div>*/}

            <TransactionPanel
              transactionPanelOpen={!!currentDelegate}
              onClose={() => setCurrentDelegate(null)}
              delegate={currentDelegate || {}}
              postTransaction={(address, amount) =>
                store.pushVoteTransaction(address, amount)
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
});

export default Delegates;
