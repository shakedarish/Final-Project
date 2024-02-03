import React from "react";
import Button from "./Button";

const CreateSection = () => {
  const handleClick = () => {
    console.log("HEY");
  };

  return (
    <div
      className="h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/img-home.jpg")' }}
    >
      <div className="m-20 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4">Tell me:</h1>
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-md resize-none m-4"
          placeholder="Type your message here..."
        />
        <Button className='text-xl text-center ' buttonStyle='btn--primary'
          buttonSize='btn--large' onClick={handleClick}>SUBMIT</Button>
      </div>
    </div>
  );
};

export default CreateSection;
