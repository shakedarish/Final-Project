import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import CreateSection from "./components/CreateSection";
import AboutUs from "./components/pages/AboutUs";
import CreatePage from "./components/pages/CreatePage";

function App() {
  return (
    <div className="h-full flex flex-col">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/about-us" exact Component={AboutUs} />
          <Route path="/createForm" element={<CreateSection />} />
          <Route path="/createPage" element={<CreatePage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
