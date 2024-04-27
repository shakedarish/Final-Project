import React from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import EditButton from "../EditButton";

function Terms() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-[1800px] rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>
      <div className="h-full flex-col justify-start items-center">
        <div className="container mx-auto mt-8 bg-white rounded-3xl shadow-md p-10 mb-6 w-3/5 text-center">
          <h1 className="text-4xl font-bold text-black">
            Generate Video with Ease
          </h1>
          <p className="text-xl text-black mt-6">
            Turn your ideas into captivating videos using AI technology.
          </p>
        </div>

        <div className="px-4">
          <div className="container mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-md p-10 mb-6 w-3/5 ">
            <h2 className="text-2xl font-semibold mb-5">Terms of Service</h2>
            <p className="text-base leading-relaxed text-gray-700">
              By accessing and using our website and services, you agree to
              these terms of service ("Terms"). Please read these Terms
              carefully before using our service. We may modify the Terms at any
              time by posting the modified Terms on the service. You agree to be
              bound by any modifications to the Terms. If you disagree with any
              part of the Terms, then you may not access or use the service.
              These Terms apply to all users of the service, including without
              limitation, users who are browsers, vendors, customers, merchants,
              and/or contributors of content.
            </p>
            <p>
              VidWizard is an online platform that enables users to create
              short, high-quality videos using AI-driven scripting, automated
              scene creation, and video assembly technologies. Users provide
              input about the video content they wish to create, which our AI
              then uses to generate scripts and corresponding video scenes
              sourced from our extensive media library.
            </p>
            <ul className="list-disc space-y-4 mb-4 mt-4">
              <h2 className="mb-2 font-bold">Prohibited Uses Include:</h2>
              <li>
                Any form of content that is illegal, offensive, or harmful.
              </li>
              <li>Activities that endanger minors.</li>
              <li>
                Impersonate any person or entity or falsely state or otherwise
                misrepresent your affiliation with a person or entity.
              </li>
            </ul>
            <p>
              We use advanced AI technologies, such as those provided by OpenAI
              and Azure, to ensure content safety and fairness. we proactively
              monitor the content generated to prevent and eliminate bias,
              discrimination, and harmful content. We reserve the right to
              cancel any content that fails to meet these standards.
            </p>
            <p className="mt-4">
              You acknowledge that we own all rights, titles, and interests in
              and to the service and all proprietary materials provided through
              the service. The service is protected by copyright. You agree not
              to reproduce, duplicate, copy, sell, resell, or exploit for any
              commercial purposes any portion of the service.
            </p>
          </div>
          <div className="container mx-auto mt-8 bg-white rounded-3xl shadow-md p-10 mb-6 w-3/5">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Complete Workflow
            </h2>
            <ol className="list-decimal space-y-4 text-lg text-gray-700">
              <li>Describe your video idea using our simple input form.</li>
              <li>
                Rely on AI powered by OpenAI, to generate detailed script based
                on your initial concept with the help our pre made sophisticated
                prompt.
              </li>
              <li>Review and edit your generated AI script if needed.</li>
              <li>
                Script is visualized into scenes using specific prompts to
                select with precision the best matching short videos from
                Pexels.
              </li>
              <li>
                Assemble scenes into a complete video with options for custom
                voice overs using Azure Text-to-Speech, background music, and
                subtitles.
              </li>
            </ol>
          </div>
        </div>
        <div className="container mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-md p-10 mb-6 w-3/5 text-center">
          <h2 className="text-2xl font-bold text-cyan-600">
            Ready to Create Your Video?
          </h2>
          <p className="text-lg text-black mt-4">
            Start by telling us about your video idea. No sign-up required!
          </p>
          <EditButton
            text="Get Started Now"
            onClick={() => navigate("/CreatePage")}
            additionalClass="bg-cyan-100 hover:bg-cyan-400 border-gray-900 border-2 text-black mt-10 w-fit"
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Terms;
