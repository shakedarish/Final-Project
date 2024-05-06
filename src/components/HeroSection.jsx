import React from "react";
import "../App.css";
import Button from "./Button";
import "./HeroSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function HeroSection() {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat">
      <video
        className="homeVideo"
        src="/videos/video-1.mp4"
        autoPlay
        loop
        muted
        preload="auto"
      />
      <h1 className="text-7xl font-bold text-white">VidWizard</h1>
      <p className="text-white text-2xl m-5 font-[kalam-bold]">
        What are you waiting for?
      </p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          linkPath="/createPage"
        >
          GET STARTED&nbsp; <FontAwesomeIcon icon={faPlayCircle} />
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          linkPath="/examples"
        >
          EXAMPLES <i className="far fa-play-circle " />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
