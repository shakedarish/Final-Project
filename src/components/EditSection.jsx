import React, { useState } from "react";
import EditButton from "./EditButton";
import { useNavigate } from "react-router-dom";

const EditSection = ({ scriptText, setIsedited }) => {
  const navigate = useNavigate();
  const [text, setText] = useState(scriptText);
  const [isEdit, setIsEdit] = useState(false);

  const handleToggleEditing = () => {
    setIsEdit((prev) => !prev);
  };

  const handleConfirm = () => {
    console.log("confirm");
    setIsedited(true);
    // navigate("/", { replace: true });
  };

  return (
    <>
      <h1 className="mt-10 font-bold text-4xl">Your gentrated script</h1>
      <textarea
        className="w-10/12 flex-1 p-2 border-none rounded-lg resize-none bg-white bg-opacity-70"
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={!isEdit}
        rows={5}
        cols={50}
      />
      <div className="mb-16 flex justify-between w-2/5">
        <EditButton
          text={isEdit ? "Done" : "Edit"}
          onClick={handleToggleEditing}
          additionalClass="bg-zinc-800 hover:bg-zinc-900"
        />
        <EditButton
          text="Confirm"
          onClick={handleConfirm}
          additionalClass="bg-zinc-800 hover:bg-zinc-900"
        />
      </div>
    </>
  );
};

export default EditSection;
