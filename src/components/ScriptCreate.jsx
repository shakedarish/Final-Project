import React, { useState } from "react";
import EditButton from "./EditButton";
import { getScript } from "../util/genrateScript";

const ScriptCreate = ({ setDesc, setLoading }) => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const requestData = { message: text };

    try {
      setLoading(true);
      const responseData = await getScript(requestData);
      setDesc(responseData);
      setLoading(false);
      console.log("generated script successfully");
    } catch (error) {
      console.error("Error generated script:", error);
    }
  };

  return (
    <>
      <h1 className="mt-10 font-bold text-4xl">Few words about your video</h1>

      <textarea
        className="w-10/12 p-2 border-none rounded-lg text-xl resize-none bg-white shadow-lg"
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
        additionalClass="bg-zinc-800 hover:bg-zinc-900 absolute bottom-16"
      />
    </>
  );
};

export default ScriptCreate;
