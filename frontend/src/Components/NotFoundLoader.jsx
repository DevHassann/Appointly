import React from "react";
import AnimationData from "../Assets/Animations/Animation - 1699940887263.json";
import Lottie from "react-lottie";

const NotFoundLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={400} height={400} />
    </div>
  );
};

export default NotFoundLoader;
