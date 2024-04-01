import React from "react";
import Policy from "./Policy"; // Assuming Policy.js is in the same directory
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      {/*<div className="h-full flex flex-col justify-start bg-cover bg-center bg-no-repeat items-center gap-8 ">
       */}
      <div className="h-full flex-col justify-start items-center">
        {/* Hero Section */}
        <div className="hero bg-gradient-to-r from-indigo-500 to-purple-500 py-20 text-center">
          <h1 className="text-4xl font-bold text-white">
            Generate Video Scripts with Ease
          </h1>
          <p className="text-xl text-white mt-4">
            Turn your ideas into captivating video scripts using AI technology.
          </p>
          <button
            className="btn btn-primary mt-8"
            onClick={() => navigate("/CreatePage")}
          >
            Get Started Now
          </button>
        </div>
        {/* How It Works Section */}
        <div className="how-it-works container mx-auto py-16">
          <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="step flex items-center">
              <div className="stage-number text-3xl font-bold text-indigo-500 mr-4">
                1.
              </div>
              <i className="fas fa-pencil-alt text-4xl text-indigo-500 mb-4"></i>
              <div className="step-content">
                <h3>Describe Your Video</h3>
                <p>
                  Provide a brief description of your desired video content.
                </p>
              </div>
            </div>
            <div className="step flex items-center">
              <div className="stage-number text-3xl font-bold text-indigo-500 mr-4">
                2.
              </div>
              <i className="fas fa-robot text-4xl text-indigo-500 mb-4"></i>
              <div className="step-content">
                <h3>AI Generates Script</h3>
                <p>
                  Our AI engine analyzes your input and crafts a compelling
                  script.
                </p>
              </div>
            </div>
            <div className="step flex items-center">
              <div className="stage-number text-3xl font-bold text-indigo-500 mr-4">
                3.
              </div>
              <i className="fas fa-microphone text-4xl text-indigo-500 mb-4"></i>
              <div className="step-content">
                <h3>Choose Voiceover (Optional)</h3>
                <p>Select a voice and language for your narrated video.</p>
              </div>
            </div>
            <div className="step flex items-center">
              <div className="stage-number text-3xl font-bold text-indigo-500 mr-4">
                4.
              </div>
              <i className="fas fa-play text-4xl text-indigo-500 mb-4"></i>
              <div className="step-content">
                <h3>Video Generated!</h3>
                <p>Enjoy or have fun with your finished video.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Benefits Section */}
        <div className="benefits container mx-auto py-16">
          <h2 className="text-2xl font-semibold mb-8">Benefits</h2>
          <ul className="list-disc pl-4">
            <li>
              Save Time & Effort: Generate scripts quickly without writer's
              block.
            </li>
            <li>
              Boost Creativity: Get fresh ideas and overcome creative
              roadblocks.
            </li>
            <li>
              Enhance Video Quality: Craft engaging scripts for impactful
              videos.
            </li>
            <li>
              Simple Process: Easy-to-use interface for everyone, from beginners
              to pros.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
