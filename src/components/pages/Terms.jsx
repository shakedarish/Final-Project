import React from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import EditButton from "../EditButton";

function Terms() {
  const navigate = useNavigate();
  return (
    <>
      {/*<div className="h-full flex flex-col justify-start bg-cover bg-center bg-no-repeat items-center gap-8 ">
       */}
      {/* <div className="w-[1200px] h-[1200px] rounded-[999px] absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
      <div className="w-[1200px] h-[1200px] rounded-[999px] absolute top-6rem right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div> */}
      <div class="w-full h-full rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>

      <div className="h-full flex-col justify-start items-center">
        {/* Hero Section */}
        <div className="container mx-auto mt-8 bg-white rounded-3xl shadow-md p-10 mb-6 w-3/5 text-center">
          <h1 className="text-4xl font-bold text-black">
            Generate Video Scripts with Ease
          </h1>
          <p className="text-xl text-black mt-6">
            Turn your ideas into captivating video scripts using AI technology.
          </p>
          {/* <button
            className="btn btn-primary mt-6"
            onClick={() => navigate("/CreatePage")}
          >
            Get Started Now
          </button> */}
          <EditButton
            text="Get Started Now"
            onClick={() => navigate("/CreatePage")}
            additionalClass="bg-cyan-100 hover:bg-cyan-400 border-gray-900 border-2 text-black mt-10 w-fit"
          />
        </div>
        {/* How It Works Section */}
        <div className="px-4">
          <div className="container mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-md p-10 mb-6 w-3/5">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
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
          <div className="container mx-auto mt-8 bg-white rounded-3xl shadow-md p-10 mb-6 w-3/5">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Complete Workflow
            </h2>
            <ol className="list-decimal space-y-4 text-lg text-gray-700">
              <li>Describe your video idea using our simple input form.</li>
              <li>
                Our AI, powered by ChatGPT, automatically generates a detailed
                script based on your description.
              </li>
              <li>Edit and refine the script with AI suggestions.</li>
              <li>
                Script is visualized into scenes using specific prompts to
                select the best matching short videos from Pexels.
              </li>
              <li>
                Assemble scenes into a complete video with options for custom
                voiceovers and background music, using Azure’s Text-to-Speech.
              </li>
            </ol>
          </div>
          <div className="container mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-md p-10 mb-6 w-3/5 ">
            <h2 className="text-2xl font-semibold mb-5">Benefits</h2>

            <ul className="list-disc space-y-2">
              <li className="">
                Save Time & Effort: Generate scripts quickly without writer's
                block.
              </li>
              <li className="">
                Free to use: Simply visit our site and begin typing your video
                ideas.
              </li>
              <li className="">
                Enhance Video Quality: Craft engaging scripts for impactful
                videos.
              </li>
              <li className="">
                Simple Process: Easy-to-use interface for everyone, from
                beginners to pros.
              </li>
            </ul>
          </div>
          <div className="container mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-md p-10 mb-6 w-3/5 ">
            <h2 className="text-2xl font-semibold mb-5">Terms of Service</h2>
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
        <div className="container mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-md p-10 mb-6 w-3/5 text-center">
          <h2 className="text-2xl font-bold text-indigo-500">
            Ready to Create Your Video?
          </h2>
          <p className="text-lg text-black mt-4">
            Start by telling us about your video idea. No sign-up required!
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Terms;
