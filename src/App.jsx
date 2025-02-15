import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Header from  "./components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import HomePage from "./pages/HomePage";
import Workers from "./pages/Workers";
import Footer from "./components/Footer";
import Booking from "./pages/Booking";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/Booking" element={<Booking />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
