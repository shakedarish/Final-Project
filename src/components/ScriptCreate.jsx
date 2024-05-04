import React, { useState } from "react";
import EditButton from "./EditButton";
import Swal from "sweetalert2";
import { getScript } from "../util/serverUtils";
import "./SwalOverride.css";

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

    const requestData = { text, callType: "create" };
    try {
      setLoading({ loading: true, text: "Creating Your Script..." });
      const responseData = await getScript(requestData);
      console.log("response from util:" + responseData);
      let errorText =
        "We encountered a problem processing your request. Please try again later.";
      if (
        responseData === null ||
        responseData === "content_filter" ||
        responseData === "unable to create"
      ) {
        if (responseData === "content_filter") {
          errorText =
            "Your text contains content that violates our policy guidelines.";
        }
        if (responseData === "unable to create") {
          errorText = "Your text is vague, please provid a clear description.";
        }
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: errorText,
          confirmButtonText: "Back",
          confirmButtonColor: "#64bcbf",
        });
        setLoading({ loading: false });
        return;
      }

      setDesc(responseData);
      setLoading({ loading: false });
      console.log("generated script successfully");
    } catch (error) {
      console.error("Error generated script:", error);
    }
  };

  return (
    <>
      <h1 className="mb-4 font-bold text-6xl font-[kalam-bold] custom-text-shadow">
        Few words about your video...
      </h1>

      <textarea
        className="w-7/12 p-2 border-none rounded-lg text-xl resize-none bg-white shadow-lg"
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={false}
        required
        placeholder=" Type your video description here..."
        rows={5}
        cols={50}
      />
      <EditButton
        text="Submit"
        onClick={handleSubmit}
        additionalClass="bg-zinc-800 hover:bg-zinc-700 text-white mt-6"
      />
    </>
  );
};

export default ScriptCreate;
