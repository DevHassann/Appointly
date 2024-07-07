import React from "react";
import Lottie from "react-lottie";

import animationData from "../../../Assets/Animations/Animation - 1699026741446.json";

const SuccessAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-[80%] flex flex-col justify-center items-center mb-10">
      <Lottie options={defaultOptions} width={400} height={400} />
      <div className="flex flex-col items-center font-bold">
        <h1>Congratulations!</h1>
        <h2 className="font-normal tracking-tight text-base">
          You are Successfully Registered as a professional.
        </h2>
      </div>
    </div>
  );
};

export default SuccessAnimation;
