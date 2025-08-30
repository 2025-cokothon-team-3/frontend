


// components/MyLottie.jsx
import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/loading.json"; // 다운로드한 JSON 파일

const MyLottie = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ width: 300, height: 300 }}
    />
  );
};

export default MyLottie;
