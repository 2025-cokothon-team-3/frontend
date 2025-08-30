// components/Loading.jsx
import React from "react";
//import MyLottie from "./MyLottie";
import "../styles/Loading.css"; // 스타일은 question과 동일하게 복사

const Loading = () => {
  return (
    <div className="question-wrapper"> {/* question.jsx에서 쓰던 클래스 그대로 */}
      <div className="loading-container">
        <MyLottie />
        <p className="loading-text">당신의 여행 성향을 분석하고 있어요...</p>
      </div>
    </div>
  );
};

export default Loading;