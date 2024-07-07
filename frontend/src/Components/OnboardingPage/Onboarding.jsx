import React from "react";

import OnboardingForms from "./Include/OnboardingForms.jsx";

const Onboarding = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center tracking-tight py-5">
        <h1 className="text-black font-nunito text-[38px] font-bold leading-[109.9%] tracking-[-1.14px]">
          Join as a Professional
        </h1>
        <h6 className="text-[#575757] font-nunito text-[19px] font-normal leading-[109.9%] tracking-[-0.57px]">
          Onboard at Appointly and start offering your services right now
        </h6>
      </div>
      <div className="w-[90%] transition-transform ease-in-out mt-4 rounded-3xl flex flex-col py-3 items-center drop-shadow-[0_0px_10px_rgba(0,0,0,0.15)] bg-white">
        <OnboardingForms />
      </div>
    </div>
  );
};

export default Onboarding;
