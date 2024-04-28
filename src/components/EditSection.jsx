import React, { useState } from "react";
import { editScript } from "../util/serverUtils";
import Swal from "sweetalert2";
import EditButton from "./EditButton";
import "./SwalOverride.css";

const EditSection = ({
  scriptText,
  setIsedited,
  setLoading,
  setFinalScript,
}) => {
  const [text, setText] = useState(scriptText);

  const handleConfirm = async () => {
    if (!text.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Edited screept can't be empty",
        confirmButtonText: "Back",
        confirmButtonColor: "#64bcbf",
      });
      setText(scriptText);
      return;
    }
    setFinalScript(scriptText);
    const requestData = { text, callType: "edit", originalScript: scriptText };
    try {
      setLoading({ loading: true, text: "Update script..." });
      if (text.trim() !== scriptText.trim()) {
        console.log("proces edited text");
        const responseData = await editScript(requestData);
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
            errorText =
              "Your edited script dont meet our policy, please try again.";
          }
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: errorText,
            confirmButtonText: "Back",
            confirmButtonColor: "#64bcbf",
          });
          setText(scriptText);
          setLoading({ loading: false });
          return;
        }
        setFinalScript(responseData);
      }
      setLoading({ loading: false });
    } catch (error) {
      console.error("Error generated script:", error);
    }
    setIsedited(true);
  };

  return (
    <>
      <h1 className="mt-10 mb-6 font-bold text-6xl font-[kalam-bold] custom-text-shadow">
        Edit your AI generated script:
      </h1>
      <textarea
        className="w-8/12 flex-1 p-2 text-lg text-center border-none rounded-lg resize-none bg-white bg-opacity-70 shadow-lg"
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={false}
        rows={10}
        cols={50}
      />
      <EditButton
        text="Confirm"
        onClick={handleConfirm}
        additionalClass="bg-zinc-800 hover:bg-zinc-900 text-white mb-16"
      />
    </>
  );
};

export default EditSection;
