import React from "react";

import ValidationSeasonItem from "./ValidationSeasonItem";

function ValidateRoadMap({ season }) {

  return (
      <article className="pt-3">
        <div className="xl:flex">
          <div className="w-32 shrink-0">
            <h2 className="text-xl leading-snug font-bold text-slate-800 xl:leading-7 mb-4 xl:mb-0">{''}</h2>
          </div>
          <div className="grow pb-6">
            <header>
              <div className="flex flex-nowrap items-center space-x-2 mb-6">
                {/* Avatars */}
              </div>
            </header>
            {/* List */}
            <ul className="-my-2">
              {/* List item(s) */}
              {season.assets.map((item, index) => {
                return <ValidationSeasonItem key={item.label} length={season.assets.length} item={item} index={index}/>
              })}
            </ul>
          </div>
        </div>
      </article>
  )
}

export default  ValidateRoadMap;
