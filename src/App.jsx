import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import CreatePage from "./components/pages/CreatePage";

function App() {
  return (
    <div className="h-full flex flex-col">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/createPage" element={<CreatePage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
