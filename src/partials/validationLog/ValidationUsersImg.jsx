import React from "react";

function ValidationUsersImg({ image }) {

  return (
      <a className="block">
        <img className="rounded-full border-2 border-slate-100 box-content" src={image.image} width={`${image.size}`} alt={image.image} height={`${image.size}`}/>
      </a>
  );
}

export default ValidationUsersImg
