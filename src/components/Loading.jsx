import React from "react";

const Loading = ({ text }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="loader"></div>
      <h2 className="font-bold text-4xl">{text}</h2>
    </div>
  );
};

export default Loading;
