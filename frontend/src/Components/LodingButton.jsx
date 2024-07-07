import React from "react";
import AnimationData from "../Assets/Animations/Animation - 1698876091916.json";
import Lottie from "react-lottie";

const LodingButton = ({ name }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {name}{" "}
      <Lottie
        options={defaultOptions}
        width={30}
        height={30}
        style={{ marginLeft: "10px" }}
      />
    </>
  );
};

export default LodingButton;
