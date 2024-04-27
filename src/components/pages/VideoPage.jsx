import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
  const [flag, setFlag] = useState(isDemo == "true");
  console.log(`urlSuffix: ${urlSuffix}, isDemo: ${isDemo}`);
  if (flag) {
    console.log("flag is true");
  }
  const videoUrl = flag ? baseUrl + demoUrl + urlSuffix : baseUrl + urlSuffix;
  console.log("vidooUrl: " + videoUrl);

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
      {/* <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backGround})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "-1",
        }}
      ></div> */}
      <div className="w-full h-full rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>
      {/* <div className="bg-white bg-opacity-65  rounded-xl w-2/4  items-center p-10 mx-auto my-auto"> */}
      <div className="h-full w-full flex flex-col justify-start items-center gap-8 ">
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

        <EditButton
          text="Done"
          onClick={() => {}}
          additionalClass="mb-16 bg-zinc-800 hover:bg-zinc-900 text-white"
        />
      </div>
    </>
  );
};

export default VideoSeciton;
