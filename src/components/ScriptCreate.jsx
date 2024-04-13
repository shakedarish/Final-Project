import React, { useState } from "react";
import EditButton from "./EditButton";
import Swal from "sweetalert2";
import { getScript } from "../util/serverUtils";

const ScriptCreate = ({ setDesc, setLoading }) => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "You forgot to put some text...",
        confirmButtonText: "Back",
        confirmButtonColor: "#64bcbf",
      });
      return;
    }

    const requestData = { text };
    try {
      setLoading({ loading: true, text: "Create script..." });
      const responseData = await getScript(requestData);
      setDesc(responseData);
      setLoading({ loading: false });
      console.log("generated script successfully");
    } catch (error) {
      console.error("Error generated script:", error);
    }
  };

  return (
    <>
      <h1 className="mt-10 mb-10 font-bold text-6xl font-[kalam-bold] custom-text-shadow">
        Few words about your video
      </h1>

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
        additionalClass="bg-zinc-800 hover:bg-zinc-900 text-white absolute bottom-16"
      />
    </>
  );
};

export default ScriptCreate;
