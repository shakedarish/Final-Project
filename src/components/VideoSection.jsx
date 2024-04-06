import React from "react";
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

import EditButton from "./EditButton";
const downloading = require("../res/icons/downloading.png");

const VideoSeciton = () => {
  const videoUrl =
    "http://localhost:3003/downloads/video/generatedVideo/finalVideo.mp4";

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
      <h1 className="mt-10 font-bold text-4xl">Your generated video</h1>
      <div>
        <video controls width="960" height="540" autoPlay loop>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-10 mb-10 flex justify-center">
        <img
          className=""
          src={downloading}
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
          url={"https://www.google.com/"}
          quote={"testtt"}
          hashtag={"#vidoe Created By VidWizard"}
        >
          <FacebookIcon size={50} round={true} className="ml-10" />
        </FacebookShareButton>
        <WhatsappShareButton url={videoUrl}>
          <WhatsappIcon size={50} className="ml-10" round={true} />
        </WhatsappShareButton>
        <TelegramShareButton url={videoUrl}>
          <TelegramIcon size={50} className="ml-10" round={true} />
        </TelegramShareButton>
        <EmailShareButton url={videoUrl}>
          <EmailIcon size={50} className="ml-10" round={true} />
        </EmailShareButton>
        <TwitterShareButton url={videoUrl}>
          <TwitterIcon size={50} className="ml-10" round={true} />
        </TwitterShareButton>
      </div>
      <div></div>

      <EditButton
        text="Done"
        onClick={() => {}}
        additionalClass="mb-16 bg-zinc-800 hover:bg-zinc-900"
      />
    </>
  );
};

export default VideoSeciton;
