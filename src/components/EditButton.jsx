import React from "react";

const EditButton = ({ text, onClick, additionalClass, fromColor, toColor }) => {
  return (
    <button
      className={`rounded-3xl px-5 py-2 text-xl font-bold text-white w-32 ${additionalClass}
      bg-gradient-to-r ${fromColor} ${toColor}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default EditButton;
