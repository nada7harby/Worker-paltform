import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import HomePage from "./pages/HomePage";
import Workers from "./pages/Workers";
import Footer from "./components/Footer";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workers" element={<Workers />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
