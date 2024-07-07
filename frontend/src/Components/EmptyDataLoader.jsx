import React from "react";
import AnimationData from "../Assets/Animations/Animation - 1701001230212.json";
import Lottie from "react-lottie";

const EmptyDataLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex items-center justify-center">
      <Lottie options={defaultOptions} width={200} height={200} />
    </div>
  );
};

export default EmptyDataLoader;
