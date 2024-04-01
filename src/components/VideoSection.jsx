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

const VideoSeciton = () => {
  const videoUrl =
    "http://localhost:3003/downloads/video/generatedVideo/finalVideo.mp4";

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
        <FacebookShareButton
          url={"https://www.google.com/"}
          quote={"testtt"}
          hashtag={"#vidoe Created By VidWizard"}
        >
          <FacebookIcon size={50} round={true} />
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
        text="Confirm"
        onClick={() => {}}
        additionalClass="mb-16 bg-zinc-800 hover:bg-zinc-900"
      />
    </>
  );
};

export default VideoSeciton;
