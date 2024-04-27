import React from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import EditButton from "../EditButton";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-[2000px] rounded-full absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-cyan-100 to-cyan-50"></div>
      <div className="container mx-auto py-8 text-center bg-white rounded-3xl shadow-md p-6 mb-6 mt-10 w-3/5">
        <h1 className="text-4xl font-bold">About VidWizard</h1>
        <p className="text-xl mt-4">
          Empowering anyone to create high-quality, engaging video content.
        </p>

        <EditButton
          text="Get In Touch"
          onClick={() => navigate("/Contact")}
          additionalClass="bg-cyan-100 hover:bg-cyan-400 border-gray-900 border-2 text-black mt-6 w-fit"
        />
      </div>
      <div className="container mx-auto py-8 bg-cyan-50 rounded-3xl shadow-md p-6 mb-6 w-3/5">
        <h2 className="text-2xl font-semibold mb-8">Who We Are</h2>
        <p className="text-lg mb-4 whitespace-pre-line">
          VidWizard is a platform powered by AI that empowers anyone to create
          high-quality, engaging video content.{"\n"} We are Shaked Arish and
          Sean Friedman, Software engeeniring students and this is our final
          study project.
        </p>
      </div>
      <div className="container mx-auto py-8 bg-white rounded-3xl shadow-md p-6 mb-6 w-3/5">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          We believe video content is a powerful tool, but creating it can be
          time-consuming and require technical expertise. VidWizard bridges that
          gap by leveraging AI to streamline the process. Users simply provide
          their preferences and desired content, and our platform generates a
          customized script, synthesizes voiceovers, and incorporates visuals.
        </p>
      </div>
      <div className="container mx-auto py-8 bg-cyan-50 rounded-3xl shadow-md p-6 mb-6 w-3/5">
        <h2 className="text-2xl font-semibold mb-4">Why VidWizard?</h2>
        <ul className="list-disc pl-4 mb-4">
          <li className="text-lg">
            Accessible: No video editing skills needed. Create videos with ease!
          </li>
          <li className="text-lg">
            Personalized: Tailored content based on your specific requirements.
          </li>
          <li className="text-lg">
            Time-Saving: Focus on your ideas, let AI handle the production
            hassle.
          </li>
          <li className="text-lg">
            Engaging: Generate high-quality videos that capture your audience's
            attention.
          </li>
        </ul>
      </div>

      <div className="container mx-auto py-8 bg-white rounded-3xl shadow-md mb-6 p-6 w-3/5">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc pl-6">
          <li className="text-lg mb-2">
            Innovation: We constantly push boundaries to develop cutting-edge
            solutions.
          </li>
          <li className="text-lg mb-2">
            User-Centric: Your needs are our priority. We design with ease of
            use in mind.
          </li>
          <li className="text-lg mb-2">
            Excellence: We strive for exceptional results in everything we do.
          </li>
        </ul>
      </div>

      <div className="container text-center mx-auto py-8 bg-cyan-50 rounded-3xl shadow-md mb-6 p-6 w-3/5">
        <h2 className="text-2xl font-semibold mb-10">Connect With Us</h2>
        <p className="text-lg mb-4 whitespace-pre-line">
          We're excited to hear from you! Whether you'd like to learn more about
          VidWizard,{"\n"}explore potential collaborations, or simply connect,
          reach out to our Contact page.
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
          <p className="text-center mt-5">Sean Friedman</p>{" "}
        </div>
        <div>
          <img
            className="ml-6 rounded-full w-40 h-40 object-cover"
            src="/images/new1.jpg"
            alt="Person 2"
          />
          <p className="text-center mt-5 ml-5">Shaked Arish</p>{" "}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
