import React from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import EditButton from "../EditButton";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-full rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>

      <div className="h-full flex-col justify-start items-center">
        <div className="container mx-auto mt-8 bg-white rounded-3xl shadow-md p-10 mb-6 w-3/5 text-center">
          <h1 className="text-4xl font-bold text-black">
            Your Privacy Matters
          </h1>
          <p className="text-xl text-black mt-6">
            We're committed to protecting your personal information and being
            transparent about what information we collect and how we use it.
          </p>
        </div>

        <div className="px-4">
          <div className="container mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-md p-10 mb-6 w-3/5">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Privacy Policy Overview
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              This Privacy Policy describes how your personal information is
              collected, used, and shared when you visit.
            </p>
            <div className="text-lg leading-relaxed text-gray-700 mt-6">
              <h3 className="font-bold mb-2">1. Information We Collect</h3>
              <p>
                We collect various types of information from our users,
                including information you provide directly, data collected
                automatically through your interactions with our services, and
                information from third-party sources.
              </p>
              <h3 className="font-bold mt-4 mb-2">
                2. How We Use Your Information
              </h3>
              <p>
                We leverage your information to tailor and refine your
                experience on our platform, ensuring it meets your specific
                needs. By analyzing how you interact with our services, we can
                enhance website functionality and user interface, making it more
                intuitive and user-friendly. Our goal is to create a more
                personalized and efficient environment that continuously adapts
                to your preferences and requirements for video creation.
              </p>
              <h3 className="font-bold mt-4 mb-2">
                3. Sharing Your Information
              </h3>
              <p>
                We do not sell our customers' personal information to third
                parties. However, we share your information as described below,
                with partners that either are subject to this Privacy Policy or
                follow practices at least as protective as those described in
                this Privacy Policy.
              </p>
              <h3 className="font-bold mt-4 mb-2">4. Your Rights</h3>
              <p>
                You have the right to access and receive a copy of the personal
                information we hold about you, to rectify any personal
                information held about you that is inaccurate, to request the
                deletion of personal information held about you, and to opt-out
                of any marketing communications that we may send you.
              </p>
            </div>
          </div>
          <div className="container mx-auto mt-8 mb-6 bg-white rounded-3xl shadow-md p-10 w-3/5 text-center">
            <h2 className="text-2xl font-bold text-cyan-600">
              Ready to Create Your Video?
            </h2>
            <p className="text-lg text-black mt-6">
              Create your video now or learn more about VidWizard from our
              <Link to="/terms" className="font-semibold text-cyan-600">
                &nbsp;terms of service.
              </Link>
            </p>
            <EditButton
              text="Start Create Your Video"
              onClick={() => navigate("/createPage")}
              additionalClass="bg-cyan-100 hover:bg-cyan-400 border-2 border-gray-900 text-black mt-10 w-fit"
            />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
