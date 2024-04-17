import React from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import EditButton from "../EditButton";

function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <>
      <div class="w-full h-full rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>

      <div className="h-full flex-col justify-start items-center">
        <div className="container mx-auto mt-8 bg-white rounded-3xl shadow-md p-10 mb-6 w-3/5 text-center">
          <h1 className="text-4xl font-bold text-black">
            Your Privacy Matters
          </h1>
          <p className="text-xl text-black mt-6">
            We're committed to protecting your personal information and being
            transparent about what information we collect and how we use it.
          </p>
          <EditButton
            text="Learn More"
            onClick={() => navigate("/")}
            additionalClass="bg-cyan-100 hover:bg-cyan-400 border-gray-900 border-2 text-black mt-10 w-fit"
          />
        </div>

        {/* Privacy Policy Details */}
        <div className="px-4">
          <div className="container mx-auto mt-8 bg-cyan-50 rounded-3xl shadow-md p-10 mb-6 w-3/5">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Privacy Policy Overview
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              This Privacy Policy describes how your personal information is
              collected, used, and shared when you visit or make a purchase from
              [Your Website].
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
                Your information helps us personalize and continuously improve
                your experience. We use the information to handle orders,
                deliver products and services, process payments, communicate
                with you about orders, products, services, and promotional
                offers, update our records and maintain your accounts with us,
                display content such as customer reviews, and recommend
                merchandise and services that might be of interest to you.
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
              <h3 className="font-bold mt-4 mb-2">4. Data Security</h3>
              <p>
                To protect the security of your personal information, we use a
                variety of security technologies and procedures to help protect
                your personal information from unauthorized access, use, or
                disclosure.
              </p>
              <h3 className="font-bold mt-4 mb-2">5. Your Rights</h3>
              <p>
                You have the right to access and receive a copy of the personal
                information we hold about you, to rectify any personal
                information held about you that is inaccurate, to request the
                deletion of personal information held about you, and to opt-out
                of any marketing communications that we may send you.
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
