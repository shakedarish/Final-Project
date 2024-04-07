import React, { useState } from "react";
import EditSection from "../EditSection";
import VoiceSeciton from "../VoiceSection";
import ScriptCreate from "../ScriptCreate";
import Loading from "../Loading";
import VideoSeciton from "../VideoSection";
import "../../App.css";
function GetCreateComponent({
  setIsLoading,
  setIsEdited,
  setDescText,
  isLoading,
  isEdited,
  descText,
}) {
  // if (true) return <VideoSeciton />;
  if (isLoading) {
    return <Loading text="Create script..." />;
  }

  if (descText === "") {
    return <ScriptCreate setDesc={setDescText} setLoading={setIsLoading} />;
  }

  if (!isEdited) {
    return <EditSection scriptText={descText} setIsedited={setIsEdited} />;
  }

  return <VoiceSeciton />;
}

const CreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [descText, setDescText] = useState("");

  return (
    <>
      {/* <VideoSeciton /> */}
      <div class="w-full h-full rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>
      <div className="h-full w-full flex flex-col justify-start items-center gap-8 ">
        <GetCreateComponent
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setIsEdited={setIsEdited}
          isEdited={isEdited}
          setDescText={setDescText}
          descText={descText}
        />
      </div>
    </>
  );
};

export default CreatePage;
