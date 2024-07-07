import React from "react";

import Onboarding from "../../Components/OnboardingPage/Onboarding";
import Footer from "../../Components/Partials/Footer";
import NavbarMain from "../../Components/Partials/NavbarMain";

const OnboardingPage = () => {
  return (
    <>
      <NavbarMain />
      <Onboarding />
      <Footer />
    </>
  );
};

export default OnboardingPage;
