import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import Button from "./Button";

const CreateSection = () => {
  //const navigate = useNavigate();
  const [data, setData] = useState("");
  const [responseData, setResponseData] = useState("");

  const handleClick = async () => {
    const requestData = { message: data };

    try {
      const response = await fetch("http://localhost:3003/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      setResponseData(responseData);
      console.log("Data added successfully");
      //  navigate("/");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleNext = () => {};

  return (
    <div
      className="h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/img-home.jpg")' }}
    >
      <div className="m-20 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4 underline">Tell me:</h1>
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-md resize-none m-4 bg-transparent text-xl"
          placeholder="Type your video description here..."
          value={data}
          required
          onChange={(e) => setData(e.target.value)}
        />
        <Button
          className="text-xl text-center"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={handleClick}
        >
          SUBMIT
        </Button>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </Link>
      </div>

      <div className="text-xl bg-black text-white text-center">
        <h1>Response:</h1>
        <br></br>
        {responseData && <p>{responseData}</p>}
      </div>
    </div>
  );
};

export default CreateSection;
