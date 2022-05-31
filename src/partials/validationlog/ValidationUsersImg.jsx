import React from "react";

function ValidationUsersImg({ image }) {
  return (
      <a className="block" href="#0">
        <img className="rounded-full border-2 border-white box-content" src={image.img} width="28" alt={image.img} height="28"/>
      </a>
  );
}

export default ValidationUsersImg
