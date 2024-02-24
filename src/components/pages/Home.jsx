import React from "react";
import HeroSection from "../HeroSection";
import "../../App.css";
import Footer from "../Footer";

const Home = () => {
  return (
    <div className="h-full overflow-auto homePageBg">
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Home;
