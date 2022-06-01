import React from "react";

function ValidationUsersImg({ image }) {
  return (
      <a className="block" href="#0">
        <img className="rounded-full border-2 border-slate-100 box-content" src={image.img} width={`${image.size}`} alt={image.img} height={`${image.size}`}/>
      </a>
  );
}

export default ValidationUsersImg
