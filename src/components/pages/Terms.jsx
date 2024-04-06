import React from "react";
// import Policy from "./Policy"; // Assuming Policy.js is in the same directory
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

function Terms() {
  const navigate = useNavigate();
  return (
    <>
      {/*<div className="h-full flex flex-col justify-start bg-cover bg-center bg-no-repeat items-center gap-8 ">
       */}
      <div className="w-[1200px] h-[1200px] rounded-[999px] absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
      <div className="w-[1200px] h-[1200px] rounded-[999px] absolute top-6rem right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
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
        <div className="px-4">
          <div className="how-it-works mx-auto py-16">
            <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="step flex items-center">
                <div className="stage-number text-3xl font-bold text-indigo-500 mr-4">
                  1.
                </div>
                <i className="fas fa-pencil-alt text-4xl text-indigo-500 mb-4"></i>
                <div className="step-content">
                  <h3 className="font-bold">Describe Your Video</h3>
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
                  <h3 className="font-bold">AI Generates Script</h3>
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
                  <h3 className="font-bold">Choose Voiceover (Optional)</h3>
                  <p>Select a voice and language for your narrated video.</p>
                </div>
              </div>
              <div className="step flex items-center">
                <div className="text-3xl font-bold text-indigo-500 mr-4">
                  4.
                </div>
                <i className="fas fa-play text-4xl text-indigo-500 mb-4"></i>
                <div className="step-content">
                  <h3 className="font-bold">Video Generated!</h3>
                  <p>Enjoy or have fun with your finished video.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="how-it-works benefits container mx-auto py-5">
            <h2 className="text-2xl font-semibold mb-5">Benefits</h2>
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
                Simple Process: Easy-to-use interface for everyone, from
                beginners to pros.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">Terms of Service</h2>
            <p className="text-base leading-relaxed text-gray-700">
              By using our service, you agree to these terms of service
              ("Terms"). Please read these Terms carefully before using our
              service.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              We may modify the Terms at any time by posting the modified Terms
              on the service. You agree to be bound by any modifications to the
              Terms. If you disagree with any part of the Terms, then you may
              not access or use the service.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              These Terms apply to all users of the service, including without
              limitation, users who are browsers, vendors, customers, merchants,
              and/or contributors of content.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
