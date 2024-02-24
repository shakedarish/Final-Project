import React, { useState } from "react";
import EditSection from "../EditSection";
import VoiceSeciton from "../VoiceSection";
import ScriptCreate from "../ScriptCreate";

const CreatePage = () => {
  const [isEdited, setIsEdited] = useState(false);
  const [descText, setDescText] = useState("");

  return (
    <div
      className="h-full flex flex-col justify-start bg-cover bg-center bg-no-repeat items-center gap-8 
    bg-gradient-to-tr from-blue-300 to-white via-cyan-200"
    >
      {descText === "" && <ScriptCreate setDesc={setDescText} />}
      {descText !== "" && !isEdited && (
        <EditSection scriptText={descText} setIsedited={setIsEdited} />
      )}
      {descText !== "" && isEdited && <VoiceSeciton />}
    </div>
  );
};

export default CreatePage;
