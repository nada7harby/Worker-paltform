import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import "../assets/css/Home.css";
import BackToTopButton from "../components/BackToTopButton";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection/>
      <HowItWorksSection/>
      <BackToTopButton />
      <Footer/>

    </>
  );
};

export default HomePage;
