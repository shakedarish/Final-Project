import React from "react";
// import Policy from "./Policy"; // Assuming Policy.js is in the same directory
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

function Policy() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[1200px] h-[1700px] rounded-[999px] absolute top-0 right-10rem -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
      <div className="w-[1200px] h-[1700px] rounded-[999px] absolute top-6rem right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
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
        <div className="container mx-auto py-16">
          <h1>Our Privacy Policy</h1>

          {/* Step 1: Data Privacy Laws */}
          <section className="mb-8">
            <h2>1. Data Privacy Laws</h2>
            <p className="text-lg">
              We take the privacy of our users very seriously. This Privacy
              Policy describes how we collect, use, disclose, and secure your
              personal information in accordance with applicable data privacy
              laws.
            </p>
          </section>

          {/* Step 2: Privacy Audit */}
          <section className="mb-8">
            <h2>2. Privacy Audit</h2>
            <p className="text-lg">
              We conduct regular privacy audits to identify how we collect and
              manage personal information. This helps ensure we are compliant
              with data privacy regulations.
            </p>
          </section>

          {/* Step 3: Categories of Personal Information */}
          <section className="mb-8">
            <h2>3. Categories of Personal Information</h2>
            <p className="text-lg">
              We may collect the following categories of personal information:
            </p>
            <ul className="list-disc pl-4">
              <li>
                Personal identifiers: This may include your name and email
                address (if provided).
              </li>
              <li>
                Usage data: We may collect information about how you use our
                service, such as the features you access and the content you
                generate.
              </li>
            </ul>
            <p className="text-lg">
              We do not collect any sensitive personal information such as race,
              religion, or health data.
            </p>
          </section>

          {/* Step 4: Why We Collect Personal Data */}
          <section className="mb-8">
            <h2>4. Why We Collect Personal Data</h2>
            <p className="text-lg">
              We collect personal information to provide and improve our
              service. Here are some specific reasons:
            </p>
            <ul className="list-disc pl-4">
              <li>To identify you and provide access to our service.</li>
              <li>
                To improve the functionality and user experience of our service.
              </li>
              <li>
                To send you important information about our service, such as
                updates and announcements (if you have opted-in).
              </li>
            </ul>
          </section>

          {/* Step 5: How We Collect Data */}
          <section className="mb-8">
            <h2>5. How We Collect Data</h2>
            <p className="text-lg">
              We collect personal information in the following ways:
            </p>
            <ul className="list-disc pl-4">
              <li>
                Information you provide directly: You may provide your name and
                email address when you use certain features of our service.
              </li>
              <li>
                Information collected automatically: We may collect information
                about your use of our service through cookies and other tracking
                technologies. (You can find more information about cookies in
                our separate Cookie Policy).
              </li>
            </ul>
          </section>

          {/* Step 6: How We Use Personal Data */}
          <section className="mb-8">
            <h2>6. How We Use Personal Data</h2>
            <p className="text-lg">
              We use your personal information only for the purposes described
              in this Privacy Policy. We will not share your personal
              information with third parties without your consent, except as
              necessary to provide our service or comply with legal
              requirements.
            </p>
          </section>

          {/* Step 7: Safety and Security Practices */}
          <section className="mb-8">
            <h2>7. Safety and Security Practices</h2>
            <p className="text-lg">
              We take reasonable steps to protect your personal information from
              loss, misuse, unauthorized access, disclosure, alteration, or
              destruction. However, no internet transmission or electronic
              storage method is 100% secure. We cannot guarantee the absolute
              security of any personal information.
            </p>
          </section>

          {/* Step 8: Your Rights */}
          <section className="mb-8">
            <h2>8. Your Rights</h2>
            <p className="text-lg">
              Depending on your location, you may have certain rights regarding
              your personal information. These rights may include the right to:
            </p>
            <ul className="list-disc pl-4">
              <li>Access your personal information.</li>
              <li>Correct inaccurate personal information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Object to the processing of your personal information.</li>
            </ul>
            <p className="text-lg">
              We will respect your rights in accordance with applicable data
              privacy laws. To exercise your rights, please contact us using the
              information provided in the "Contact Us" section below.
            </p>
          </section>

          {/* Step 9: Contact Us */}
          <section className="mb-8">
            <p className="text-lg">
              If you have any questions about this Privacy Policy, please
              contact us at the ContactUs page
            </p>
            <ul className="list-disc pl-4">
              <li>Email: [your_email@address.com]</li>
            </ul>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Policy;
