import React from "react";
import Footer from "../Footer";

const AboutUs = () => {
  return (
    <>
      <div class="w-[1200px] h-[1200px] rounded-[999px] absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
      <div class="w-[1200px] h-[1200px] rounded-[999px] absolute top-6rem right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
      <div className="overflow-y-auto h-full flex flex-col items-center homePageBg">
        <h1 className="text-3xl font-bold m-6 mt-10 text-center">About Us</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-3/5 ">
          <h2 className="text-lg font-bold mb-4">Who We Are:</h2>
          <p className="text-base mb-4">
            VidWizard is a platform powered by AI that empowers anyone to create
            high-quality, engaging video content. We are Shaked Arish and Sean
            Fridman, Software engeeniring students and this is our final study
            project.
          </p>
          <h2 className="text-lg font-bold mb-4">Our Mission:</h2>
          <p className="text-base mb-4">
            We believe video content is a powerful tool, but creating it can be
            time-consuming and require technical expertise. VidWizard bridges
            that gap by leveraging AI to streamline the process. Users simply
            provide their preferences and desired content, and our platform
            generates a customized script, synthesizes voiceovers, and
            incorporates visuals.
          </p>
          <h2 className="text-lg font-bold mb-4">Why VidWizard?</h2>
          <ul className="list-disc pl-4 mb-4">
            <li className="text-base">
              Accessible: No video editing skills needed. Create videos with
              ease!
            </li>
            <li className="text-base">
              Personalized: Tailored content based on your specific
              requirements.
            </li>
            <li className="text-base">
              Time-Saving: Focus on your ideas, let AI handle the production
              hassle.
            </li>
            <li className="text-base">
              Engaging: Generate high-quality videos that capture your
              audience's attention.
            </li>
          </ul>
        </div>

        <div className="bg-slate-200 rounded-lg shadow-md p-6 mb-6 w-3/5">
          <h3 className="font-bold">Our Values:</h3>
          <ul className="list-disc pl-6">
            <li className="text-base mb-2">
              Innovation: We constantly push boundaries to develop cutting-edge
              solutions.
            </li>
            <li className="text-base mb-2">
              User-Centric: Your needs are our priority. We design with ease of
              use in mind.
            </li>
            <li className="text-base mb-2">
              Excellence: We strive for exceptional results in everything we do.
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6 p-6 w-3/5">
          <h2 className="text-lg font-bold mb-4 text-center mb-8">
            Connect With Us
          </h2>
          <p className="text-base mb-4">
            We're excited to hear from you! Whether you'd like to learn more
            about VidWizard, explore potential collaborations, or simply
            connect, reach out to our Contact page.
          </p>
          <p className="mt-10 text-lg text-center font-bold mb-4">
            Our aim is to simplify video production!
          </p>
        </div>
        <div className="flex justify-center items-center mt-10 mb-5">
          <div className="mr-10">
            <img
              className="rounded-full w-40 h-40 object-cover"
              src="/images/new2.jpg"
              alt="Person 1"
            />
            <p className="text-center mt-5">Sean</p>{" "}
          </div>
          <div>
            <img
              className="ml-6 rounded-full w-40 h-40 object-cover"
              src="/images/new1.jpg"
              alt="Person 2"
            />
            <p className="text-center mt-5 ml-5">Shaked</p>{" "}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
