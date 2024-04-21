import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import CreatePage from "./components/pages/CreatePage";
import Contact from "./components/pages/Contact";
import Policy from "./components/pages/Policy";
import Terms from "./components/pages/Terms";
import VideoPage from "./components/pages/VideoPage";
import Examples from "./components/pages/Examples";
import Login from "./components/pages/Login";
import ScrollToTop from "./util/scrollTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createPage" element={<CreatePage />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/video" element={<VideoPage />} />
      </Routes>
    </Router>
  );
}
export default App;
