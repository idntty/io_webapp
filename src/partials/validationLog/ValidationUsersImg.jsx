import React from "react";

function ValidationUsersImg({ image,size }) {

  return (
      <a className="block">
        <img className="rounded-full border-2 border-slate-100 box-content" src={image} alt={image} width={size} height={size}/>
      </a>
  );
}

export default ValidationUsersImg
