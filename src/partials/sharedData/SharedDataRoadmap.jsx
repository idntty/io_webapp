import React from "react";

import ValidationUsersImg from "../validationLog/ValidationUsersImg";

function SharedDataRoadMap({ data }) {

  return (
      <article className="mb-2">
        <div className="xl:flex">
          <div className="grow">
            <div className="flex items-center mb-2 relative">
              <div className="absolute left-0" aria-hidden="true">
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7H0V11.9C0 12.9 0.7 13.8 1.7 14C2.9 14.2 4 13.2 4 12V7Z" fill="#A5B4FC"/>
                  <path d="M15.0004 0H7.00039C6.40039 0 6.00039 0.4 6.00039 1V12C6.00039 12.7 5.80039 13.4 5.40039 14H13.0004C14.7004 14 16.0004 12.7 16.0004 11V1C16.0004 0.4 15.6004 0 15.0004 0Z" fill="#6366F1"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-semibold text-slate-800 pl-7">
                  {data.text}
                </h3>
                <span className="font-normal text-[10px] text-slate-600 pl-7">{data.typeItem}</span>
              </div>
            </div>
            <div className="block text-slate-600 w-fit pl-7">
              <div className="text-xs font-semibold underline mb-[-10px] cursor-pointer">{data.dataShared}</div>
              <span className="font-normal text-[10px]">seed</span>
            </div>
            <div className="mb-3.5 block text-slate-600 w-fit pl-7">
              <div className="text-xs font-semibold underline mb-[-10px] cursor-pointer">{data.dataShared}</div>
              <span className="font-normal text-[10px]">hash</span>
            </div>
            <div className="flex flex-nowrap items-center space-x-2 mb-3.5">
              {/* Avatars */}
              <div className="flex shrink-0 -space-x-3 -ml-px pl-7">
                {data.usersImges.map(pic => {
                  return <ValidationUsersImg key={pic.imgId} image={pic}/>
                })}
              </div>
            </div>
            <a className="cursor-pointer pl-7 font-normal text-sm text-indigo-500 hover:text-indigo-600">Explore -&gt;</a>
          </div>
        </div>
      </article>
  )
}

export default  SharedDataRoadMap;
