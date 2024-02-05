import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const CreateSection = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const handleClick = () => {
    const requestData =  {data};
  
    fetch("http://localhost:3003/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        console.log("Data added successfully");
        navigate("/");
      })
      .catch(error => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/images/img-home.jpg")' }}>
      <div className="m-20 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4 underline">Tell me:</h1>
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-md resize-none m-4 bg-transparent text-xl"
          placeholder="Type your video description here..."
          value={data}
          required
          onChange={(e) => setData(e.target.value)}
        />
        <Button className='text-xl text-center' buttonStyle='btn--primary' buttonSize='btn--large' onClick={handleClick}>
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default CreateSection;
