import React from 'react';

export const Filters = ({ value, onChange, values = [] }) => {
  return (
    <div className="mb-5">
      <ul className="flex flex-wrap -m-1">
        {values.map((e) =>
          e === value ? (
            <li className="m-1" key={e}>
              <button
                className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out"
                onClick={() => onChange(e)}
              >
                {e}
              </button>
            </li>
          ) : (
            <li className="m-1" key={e}>
              <button
                className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out"
                onClick={() => onChange(e)}
              >
                {e}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
