import React, { useState, useRef } from "react";
import EditButton from "./EditButton";

const VideoSeciton = () => {
  const videoUrl =
    "http://localhost:3003/downloads/video/generatedVideo/finalVideo.mp4";
  return (
    <>
      <h1 className="mt-10 font-bold text-4xl">Your generated vide</h1>
      <div>
        <video controls width="960" height="540" autoPlay loop>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <EditButton
        text="Confirm"
        onClick={() => {}}
        additionalClass="mb-16 bg-zinc-800 hover:bg-zinc-900"
      />
    </>
  );
};

export default VideoSeciton;
