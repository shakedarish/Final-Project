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
      {/* // <VideoSeciton /> */}
      <div class="w-[1200px] h-[1200px] rounded-[999px] absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
      <div class="w-[1200px] h-[1200px] rounded-[999px] absolute top-6rem right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
      <div className="h-full flex flex-col justify-start bg-cover bg-center bg-no-repeat items-center gap-8 ">
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
