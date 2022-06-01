import React from "react";

import ValidationSeasonItem from "./ValidationSeasonItem";
import ValidationUsersImg from "./ValidationUsersImg";

function ValidateRoadMap({ season }) {

  return (
      <article className="pt-3">
        <div className="xl:flex">
          <div className="w-32 shrink-0">
            <h2 className="text-xl leading-snug font-bold text-slate-800 xl:leading-7 mb-4 xl:mb-0">{season.name}</h2>
          </div>
          <div className="grow pb-6 border-b border-slate-200">
            <header>
              <div className="flex flex-nowrap items-center space-x-2 mb-6">
                {/* Avatars */}
                <div className="flex shrink-0 -space-x-3 -ml-px">
                  {season.usersImges.map(pic => {
                    return <ValidationUsersImg key={pic.imgId} image={pic}/>
                  })}
                </div>
                <div className="text-slate-400">·</div>
              </div>
            </header>
            {/* List */}
            <ul className="-my-2">
              {/* List item(s) */}
              {season.items.map((item, index) => {
                return <ValidationSeasonItem key={item.id} length={season.items.length} item={item} index={index}/>
              })}
            </ul>
          </div>
        </div>
      </article>
  )
}

export default  ValidateRoadMap;
