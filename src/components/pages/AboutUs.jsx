import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen overflow-scroll homePageBg">
      <div className="container mx-auto px-4 py-8">
        <p className="text-3xl font-bold mb-6 text-center">About Us</p>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-lg mb-4">
            Arish and Sean Fridman are two dedicated students embarking on their
            final project journey. As part of their academic endeavors, they've
            come together to create innovative solutions and explore the realms
            of technology and creativity. Arish and Sean share a passion for
            learning, problem-solving, and pushing the boundaries of what's
            possible.
          </p>
          <p className="text-lg mb-4">
            At Arish & Sean Fridman, our mission is to leverage our academic
            knowledge, creativity, and technical skills to develop impactful
            projects that not only fulfill the requirements of our final project
            but also contribute positively to our academic and personal growth.
            We're committed to excellence, innovation, and continuous learning
            as we navigate the final stages of our educational journey.
          </p>
          <p className="text-lg mb-4">
            Arish and Sean Fridman form the dynamic duo behind our company. With
            a shared vision and complementary skills, we tackle challenges
            head-on and collaborate effectively to bring our ideas to life.
            Arish brings expertise in [insert Arish's skills or background],
            while Sean specializes in [insert Sean's skills or background].
            Together, we make a formidable team ready to take on any project.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-lg font-bold mb-2">Core Values:</p>
          <ul className="list-disc pl-6">
            <li className="text-lg mb-2">
              Learning: We believe in the power of continuous learning and
              growth, both academically and personally.
            </li>
            <li className="text-lg mb-2">
              Collaboration: We value teamwork and collaboration, recognizing
              that diverse perspectives lead to better solutions.
            </li>
            <li className="text-lg mb-2">
              Innovation: We embrace creativity and innovation, constantly
              seeking new and better ways to solve problems.
            </li>
            <li className="text-lg mb-2">
              Integrity: We uphold honesty, transparency, and ethical practices
              in all aspects of our work.
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-lg mb-4">
            While our journey as Arish & Sean Fridman is still in its early
            stages, we've already achieved significant milestones in our
            academic careers. These include [mention any relevant achievements
            or accomplishments].
          </p>
          <p className="text-lg mb-4">
            Contact Us: We welcome the opportunity to connect with you. Whether
            you're interested in learning more about our final project,
            exploring collaboration opportunities, or simply want to say hello,
            feel free to reach out to us at [insert contact email or phone
            number].
          </p>
        </div>
        <p className="text-lg mb-4">
          Thank you for joining us on this exciting journey at Arish & Sean
          Fridman.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
