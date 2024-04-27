import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton";
import Swal from "sweetalert2";
import { generateVideo } from "../util/serverUtils";
import { voices } from "../util/constData";

const playIcon = require("../res/icons/playIcon.png");
const pauseIcon = require("../res/icons/pauseIcon.png");
const nextArrow = require("../res/icons/nextSolid.png");

const VoiceSeciton = ({ setLoading }) => {
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

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
      text: "Are you struggling to get a good night's sleep? Let's explore some tips for better sleep. Create a routine by going to bed and waking up at the same time every day. Make your bedroom conducive to sleep by keeping it cool, dark, and quiet. Limit screen time before bed to reduce exposure to blue light, which can disrupt your sleep. Try relaxation techniques like deep breathing or meditation to calm your mind before bedtime. Avoid heavy meals, caffeine, and alcohol close to bedtime for a better night's rest. Stay active during the day to promote better sleep at night. Remember, good sleep hygiene is essential for overall health and well-being. Implement these tips and start enjoying a more restful night's sleep tonight.",
    };
    setLoading({ loading: true, text: "Generating your video..." });
    const response = await generateVideo(generateVideoData);
    setLoading({ loading: false });
    if (!response) {
      Swal.fire({
        icon: "error",
        title: "Opps",
        text: "Something went wrong, plesae try agian later",
        confirmButtonText: "Back",
        confirmButtonColor: "#64bcbf",
      }).then(() => {
        navigate("/");
        return;
      });
    } else {
      navigate(`/video/${response}/false`);
    }
  };

  return (
    <>
      <h1 className="mt-10 mb-6 font-bold text-6xl font-[kalam-bold] custom-text-shadow">
        Choose Your Voiceover
      </h1>
      <div className="h-full w-3/5 flex justify-center items-center">
        <img
          src={nextArrow}
          alt="Previous"
          onClick={handlePrev}
          style={{
            cursor: "pointer",
            transform: "scaleX(-1)",
            height: "80px",
          }}
        />
        <div className="flex-1 flex flex-col gap-4 items-center text-center">
          <div className="flex flex-col items-center text-center mx-6">
            <h2 className="text-4xl font-bold m-1 font-[kalam]">
              {voices[selectedVoiceIndex].name}
            </h2>
            <h3 className="text-lg font-[kalam-light]">
              {voices[selectedVoiceIndex].gender}
            </h3>
            <p className="text-2xl mt-4 font-[kalam] ">
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
          src={nextArrow}
          alt="Previous"
          onClick={handleNext}
          style={{
            cursor: "pointer",
            height: "80px",
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
        additionalClass="mb-16 bg-zinc-800 hover:bg-zinc-900 text-white "
      />
    </>
  );
};

export default VoiceSeciton;
