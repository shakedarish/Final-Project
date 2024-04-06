import React, { useState } from "react";
import Swal from "sweetalert2";
import EditButton from "./EditButton";

const EditSection = ({ scriptText, setIsedited }) => {
  const [text, setText] = useState(scriptText);

  const handleConfirm = () => {
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
    console.log("confirm");
    setIsedited(true);
  };

  return (
    <>
      <h1 className="mt-10 mb-6 font-bold text-6xl font-[kalam-bold] custom-text-shadow">
        Edit your AI generated script
      </h1>
      <textarea
        className="w-10/12 flex-1 p-2 text-lg text-center border-none rounded-lg resize-none bg-white bg-opacity-70 shadow-lg"
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
