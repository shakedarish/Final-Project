import React, { useState } from "react";
import EditSection from "../EditSection";
import VoiceSeciton from "../VoiceSection";
import ScriptCreate from "../ScriptCreate";
import Loading from "../Loading";
import VideoSeciton from "../VideoSection";

function GetCreateComponent({
  setIsLoading,
  setIsEdited,
  setDescText,
  isLoading,
  isEdited,
  descText,
}) {
  if (true) return <VideoSeciton />;
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
    <VideoSeciton />
    // <div className="h-full flex flex-col justify-start bg-cover bg-center bg-no-repeat items-center gap-8 bg-neutral-200">
    //   <GetCreateComponent
    //     setIsLoading={setIsLoading}
    //     isLoading={isLoading}
    //     setIsEdited={setIsEdited}
    //     isEdited={isEdited}
    //     setDescText={setDescText}
    //     descText={descText}
    //   />
    // </div>
  );
};

export default CreatePage;
