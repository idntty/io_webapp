import React from "react";

function ValidationSeasonItem({ length, item, index }) {
  return (
      <li className="relative py-2">
        <div className="flex items-center mb-1">
          {length-1!==index && <div className="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>}
          <div className={`absolute left-0 rounded-full ${item.checked ? "bg-indigo-500" : "bg-[#FF0000]"}`} aria-hidden="true">
            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
              {item.checked && <path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z"/>}
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 pl-9">
            {item.trunsText} {item.checked && <a className="cursor-pointer font-bold text-indigo-500 hover:text-indigo-600 underline hover:no-underline" >{`0x${item.seasonId}`}</a>}
          </h3>
        </div>
        <div className="block text-slate-800 w-fit pl-9">
          <div className="text-base font-semibold underline mb-[-10px]">{`0x${item.seasonId}`}</div>
          <span className="font-normal text-[10px]">Transactions ID</span>
        </div>
        <div className="mb-3.5 block text-slate-800 w-fit pl-9">
          <div className="text-base font-semibold underline mb-[-10px]">{item.seasonId}</div>
          <span className="font-normal text-[10px]">Validated data</span>
        </div>
        <a className="cursor-pointer pl-9 font-normal text-sm text-indigo-500 hover:text-indigo-600">Explore -&gt;</a>
      </li>
  );
}

export default ValidationSeasonItem
