import React from "react";
import AnimationData from "../../../Assets/Animations/Animation - 1700194507181.json";
import Lottie from "react-lottie";

const ReviewsAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={400} height={400} />
    </div>
  );
};

export default ReviewsAnimation;
