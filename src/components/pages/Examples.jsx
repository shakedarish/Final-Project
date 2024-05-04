import React from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import EditButton from "../EditButton";
import { useState } from "react";

const demoVideoUrls = {
  demo1: "ImproveSleep.mp4",
  demo2: "BoostHappiness.mp4",
};

const Examples = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [voice, setVoice] = useState("");

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleVoiceChange = (event) => {
    setVoice(event.target.value);
  };
  const handleClick = () => {
    if (subject != "" && voice !== "") {
      navigate(`/video/${demoVideoUrls[subject]}/true`);
    }
  };

  return (
    <>
      <div className="w-full h-[1000px] rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>
      <div className="w-full h-full flex flex-col mt-14 justify-center items-center">
        <h1 className="text-5xl font-bold text-black text-center mt-14 font-[kalam-bold]">
          How It Works
        </h1>
        <div className="mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-md p-10 mb-6 w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="step flex items-center">
              <div className="stage-number text-3xl font-bold text-cyan-500 mr-4">
                1.
              </div>
              <i className="fas fa-pencil-alt text-4xl text-cyan-500 mb-4"></i>
              <div className="step-content">
                <h3 className="font-bold">Describe Your Video</h3>
                <p>
                  Provide a brief description of your desired video content.
                </p>
              </div>
            </div>
            <div className="step flex items-center">
              <div className="stage-number text-3xl font-bold text-cyan-500 mr-4">
                2.
              </div>
              <i className="fas fa-robot text-4xl text-cyan-500 mb-4"></i>
              <div className="step-content">
                <h3 className="font-bold">AI Generates Script</h3>
                <p>
                  Our AI engine analyzes your input and crafts a compelling
                  script.
                </p>
              </div>
            </div>
            <div className="step flex items-center">
              <div className="stage-number text-3xl font-bold text-cyan-500 mr-4">
                3.
              </div>
              <i className="fas fa-microphone text-4xl text-cyan-500 mb-4"></i>
              <div className="step-content">
                <h3 className="font-bold">Choose Voiceover (Optional)</h3>
                <p>
                  Select a voiceover and background music for your narrated
                  video.
                </p>
              </div>
            </div>
            <div className="step flex items-center">
              <div className="text-3xl font-bold text-cyan-500 mr-4">4.</div>
              <i className="fas fa-play text-4xl text-cyan-500 mb-4"></i>
              <div className="step-content">
                <h3 className="font-bold">Final Video Ready!</h3>
                <p>Watch your ideas come to life in your final video.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h1 className="text-5xl font-bold text-black text-center mb-8 font-[kalam-bold]">
            Video Examples
          </h1>
          <p className="text-2xl text-black text-center mb-20 font-[kalam]">
            Explore how VidWizard can transform descriptions into stunning
            videos. Try out our demos below!
          </p>
          <div className="text-center text-xl mb-10 ">
            <select
              className="w-3/6 py-2 rounded-3xl border border-black text-center"
              name="subject"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
            >
              <option value="" disabled>
                Select Video Subject
              </option>
              <option value="demo1" className="">
                Tips for better sleep
              </option>
              <option value="demo2" className="">
                Boost your happiness level
              </option>
            </select>
          </div>
          <div className="text-center text-xl mb-8">
            <select
              className="w-3/6 py-2 rounded-3xl border border-black text-center"
              name="voice"
              id="voice"
              value={voice}
              onChange={handleVoiceChange}
            >
              <option value="" disabled>
                Choose Voice
              </option>
              <option value="Female" className="">
                {subject == "demo2" ? "Male Voice" : "Female Voice"}
              </option>
            </select>
          </div>
          <div className="text-center">
            <EditButton
              text="Show Video"
              onClick={handleClick}
              additionalClass="bg-zinc-800 hover:bg-zinc-700 text-white mt-10 mb-8 w-fit"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Examples;
