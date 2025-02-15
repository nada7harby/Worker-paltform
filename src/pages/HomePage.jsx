import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import "../assets/css/Home.css";
import "../assets/css/style.css";
import BackToTopButton from "../components/BackToTopButton";
import DonationFields from "../components/DonationFields";
import ServiceForm from "../components/ServiceForm";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServiceForm></ServiceForm>

      <DonationFields></DonationFields>
      <HowItWorksSection />
      <BackToTopButton />
    </>
  );
};

export default HomePage;
