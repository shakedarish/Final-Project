import React from "react";

const EditButton = ({ text, onClick, additionalClass }) => {
  return (
    <button
      className={`rounded-3xl px-5 py-2 text-xl font-bold text-white w-32 ${additionalClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default EditButton;
