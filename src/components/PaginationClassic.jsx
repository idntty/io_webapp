import React from 'react';
import cn from 'classnames'

function PaginationClassic({count, limit, offset, onNextPage, onPrevPage}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button
              className={
              cn(
                "btn bg-white border-slate-200 text-indigo-500",
                {'cursor-not-allowed text-slate-300': offset === 0},
                {'hover:border-slate-300' : offset !== 0}
              )}
              disabled={offset === 0}
              onClick={onPrevPage}>&lt;- Previous</button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              className={cn(
                "btn bg-white border-slate-200 text-indigo-500",
                {'cursor-not-allowed text-slate-300': offset + limit >= count},
                {'hover:border-slate-300' : offset + limit < count}
              )}
              disabled={offset + limit >= count}
              onClick={onNextPage}>Next -&gt;</button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600">{offset + 1}</span> to <span className="font-medium text-slate-600">{offset+limit}</span> of <span className="font-medium text-slate-600">{count}</span> results
      </div>
    </div>
  );
}

export default PaginationClassic;
