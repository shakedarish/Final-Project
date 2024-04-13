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
import EditButton from "../EditButton";
const downloadIcon = require("../../res/icons/downloading.png");

const VideoSeciton = () => {
  const videoUrl = sessionStorage.getItem("videoUrl");

  if (!videoUrl) {
    console.error("videoUrl is empty or undefined");
  }
  console.log("videoUrl: " + videoUrl);

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
      <div className="h-full w-full flex flex-col justify-start items-center gap-8 ">
        <h1 className="mt-10 mb-10 font-bold text-6xl font-[kalam-bold] custom-text-shadow">
          Your generated video
        </h1>
        <div>
          <video controls width="960" height="540" autoPlay loop>
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
        <div></div>

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
