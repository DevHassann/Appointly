import React from "react";
import Navbar from "../../Components/Partials/Navbar";
import HeroSection from "../../Components/HomePage/HeroSection";
import PopularCategories from "../../Components/HomePage/PopularCategories";
import FeatureSection from "../../Components/HomePage/FeatureSection";
import TopProfessionals from "../../Components/HomePage/TopProfessionals";
import Footer from "../../Components/Partials/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PopularCategories />
      <FeatureSection />
      <TopProfessionals />
      <Footer />
    </>
  );
};

export default HomePage;
