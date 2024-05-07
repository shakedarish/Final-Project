import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
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
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createPage" element={<CreatePage />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/video/:urlSuffix/:isDemo" element={<VideoPage />} />
        <Route
          path="*"
          element={
            <div>
              <h1>404 Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
}
export default App;
