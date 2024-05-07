import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  TelegramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import EditButton from "../EditButton";
const downloadIcon = require("../../res/icons/downloading.png");
const baseUrl = "http://localhost:3003/downloads/video/generatedVideo/";
const demoUrl = "demo/";

const VideoSeciton = () => {
  const { urlSuffix, isDemo } = useParams();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(isDemo == "true");

  const videoUrl = flag ? baseUrl + demoUrl + urlSuffix : baseUrl + urlSuffix;

  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "generatedVideo.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  return (
    <>
      <div className="w-full h-full rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>
      <div className="h-full w-full flex flex-col justify-start items-center gap-4 ">
        <h1 className="mt-10 mb-10 font-bold text-6xl font-[kalam-bold] custom-text-shadow">
          {flag ? "Demo Video" : "Your generated video"}
        </h1>
        <div className="flex justify-center bg-white rounded-3xl shadow-2xl p-6 w-1/2 hover:-translate-y-1 hover:scale-105">
          <video
            controls
            className="mx-auto flex-1 shadow-xl rounded-3xl overflow-hidden transition transform"
            autoPlay
            loop
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="mt-10 mb-10 flex justify-center">
          <img
            className=""
            src={downloadIcon}
            alt="Previous"
            onClick={handleDownload}
            style={{
              cursor: "pointer",
              marginRight: "10px",
              transform: "scaleX(-1)",
              height: "50px",
            }}
          ></img>
          <FacebookShareButton
            url={videoUrl}
            hashtag={"#video Created By VidWizard"}
          >
            <FacebookIcon size={50} round={true} className="ml-10" />
          </FacebookShareButton>
          <WhatsappShareButton url={videoUrl}>
            <WhatsappIcon size={50} className="ml-10" round={true} />
          </WhatsappShareButton>
          <TelegramShareButton
            url={videoUrl}
            aria-label="Share via Telegram"
            alt="Share via Telegram"
            text="Share via Telegram"
          >
            <TelegramIcon
              size={50}
              className="ml-10"
              round={true}
              aria-label="Telegram"
              alt="Telegram"
              text="Telegram"
              name="Telegram"
            />
          </TelegramShareButton>
          <EmailShareButton url={videoUrl}>
            <EmailIcon size={50} className="ml-10" round={true} />
          </EmailShareButton>
          <TwitterShareButton
            url={videoUrl}
            aria-label="Share via Twitter"
            alt="Share via Twitter"
            text="Share via Twitter"
          >
            <TwitterIcon
              size={50}
              className="ml-10"
              round={true}
              alt="Share via Twitter"
            />
          </TwitterShareButton>
        </div>

        <EditButton
          text="Done"
          onClick={() => {
            navigate("/");
          }}
          additionalClass="mb-16 bg-zinc-800 hover:bg-zinc-900 text-white"
        />
      </div>
    </>
  );
};

export default VideoSeciton;
