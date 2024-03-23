import React, { useState, useRef } from "react";
import EditButton from "./EditButton";
import { generateVideo } from "../util/serverUtils";
import { voices } from "../util/constData";

const playIcon = require("../res/icons/playIcon.png");
const pauseIcon = require("../res/icons/pauseIcon.png");
const nextArrow = require("../res/icons/nextSolid.png");

const VoiceSeciton = () => {
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleNext = () => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    setSelectedVoiceIndex((prevIndex) =>
      prevIndex === voices.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    setSelectedVoiceIndex((prevIndex) =>
      prevIndex === 0 ? voices.length - 1 : prevIndex - 1
    );
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleConfirm = async () => {
    const generateVideoData = {
      voiceIndex: selectedVoiceIndex,
      text: "Here we go!",
    };
    const response = await generateVideo(generateVideoData);
    console.log(response);
    //todo - add logic for response
  };

  return (
    <>
      <h1 className="mt-10 font-bold text-4xl">Choose the narrator voice</h1>
      <div className="container h-full w-3/5 flex justify-between items-center">
        <img
          src={nextArrow}
          alt="Previous"
          onClick={handlePrev}
          style={{
            cursor: "pointer",
            marginRight: "10px",
            transform: "scaleX(-1)",
            height: "40px",
          }}
        />
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="flex flex-col h-3/5 items-center text-center">
            <h2 className="text-2xl font-sans font-semibold m-1">
              {voices[selectedVoiceIndex].name}
            </h2>
            <h3 className="text-gray-500 font-math">
              {voices[selectedVoiceIndex].gender}
            </h3>
            <p className="text-xl mt-4 font-sans ">
              {voices[selectedVoiceIndex].description}
            </p>
          </div>
          <img
            src={isPlaying ? pauseIcon : playIcon}
            onClick={handlePlayPause}
            alt={isPlaying ? "pause" : "play"}
            style={{
              cursor: "pointer",
              height: "50px",
            }}
          />
        </div>
        <img
          className="mt-5"
          src={nextArrow}
          alt="Previous"
          onClick={handleNext}
          style={{
            cursor: "pointer",
            marginRight: "10px",
            height: "40px",
          }}
        />
      </div>

      <audio
        ref={audioRef}
        src={voices[selectedVoiceIndex].audioFile}
        onEnded={handleAudioEnded}
      />

      <EditButton
        text="Confirm"
        onClick={handleConfirm}
        additionalClass="mb-16 bg-zinc-800 hover:bg-zinc-900"
      />
    </>
  );
};

export default VoiceSeciton;
