import React from "react";
import Footer from "../Footer";
// import { useNavigate } from "react-router-dom";
import EditButton from "../EditButton";
import { useState } from "react";

const Examples = () => {
  const [subject, setSubject] = useState("");
  const [voice, setVoice] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const videoUrls = {
    sports: "/videos/NewVideo.mp4",
    sleep: "/videos/video-1.mp4",
  };
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
    setShowVideo(false);
  };
  const handleVoiceChange = (event) => {
    setVoice(event.target.value);
    setShowVideo(false);
  };
  const handleClick = () => {
    setShowVideo(subject !== "" && voice !== "");
  };

  return (
    <>
      <div className="w-full h-full rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>
      <div className="w-full h-full px-4 py-16">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold text-black text-center mb-8 font-[kalam-bold]">
            Video Examples
          </h1>
          <p className="text-2xl text-black text-center mb-20 font-[kalam]">
            Explore how VidWizard can transform descriptions into stunning
            videos. Try out our demos below!
          </p>
          <div className="text-center mb-10 ">
            <select
              className="w-3/6 py-2 rounded border-2 border-gray-900 text-center font-[kalam]"
              name="subject"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
            >
              <option>Select Video Subject</option>
              <option value="sports" className="font-[kalam]">
                5 Tip for sport
              </option>
              <option value="sleep" className="font-[kalam]">
                How To get a good night sleep
              </option>
            </select>
          </div>
          <div className="text-center mb-8">
            <select
              className="w-3/6 py-2 rounded border-2 border-gray-900 text-center font-[kalam]"
              name="voice"
              id="voice"
              value={voice}
              onChange={handleVoiceChange}
            >
              <option>Choose Voice</option>
              <option value="Female" className="font-[kalam]">
                Female Voice
              </option>
            </select>
          </div>
          <div className="text-center">
            <EditButton
              text="Lunch Your Video !"
              onClick={handleClick}
              additionalClass="bg-cyan-100 hover:bg-cyan-400 border-gray-900 border-2 text-black mt-10 mb-8 w-fit"
            />
          </div>
          <div>
            {showVideo && subject && (
              <video
                controls
                width="60%"
                className="mt-10 mx-auto shadow-lg rounded-lg overflow-hidden transition transform hover:-translate-y-1 hover:scale-105"
                autoPlay
                loop
                // poster="/favicon.ico"
              >
                <source src={videoUrls[subject]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Examples;
