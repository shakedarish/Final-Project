import React, { useState } from "react";
import EditButton from "./EditButton";
import { getScript } from "../util/genrateScript";

const ScriptCreate = ({ setDesc }) => {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState("");

  const handleSubmit = async () => {
    const requestData = { message: text };

    try {
      const responseData = await getScript(requestData);
      setResponseData(responseData);
      setDesc(responseData);
      console.log("generated script successfully");
    } catch (error) {
      console.error("Error generated script:", error);
    }
  };

  return (
    <>
      <h1 className="mt-10 font-bold text-4xl">Few words about your video</h1>

      <textarea
        className="w-10/12 p-2 border-none rounded-lg resize-none bg-white bg-opacity-70"
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={false}
        required
        placeholder="Type your video description here..."
        rows={5}
        cols={50}
      />

      <EditButton
        text="Submit"
        onClick={handleSubmit}
        fromColor="from-green-200"
        toColor="to-green-500"
      />
    </>
  );
};

export default ScriptCreate;
