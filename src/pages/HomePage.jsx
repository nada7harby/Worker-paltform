import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import "../assets/css/Home.css";
import BackToTopButton from "../components/BackToTopButton";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection/>
      <HowItWorksSection/>
      <BackToTopButton />

    </>
  );
};

export default HomePage;
