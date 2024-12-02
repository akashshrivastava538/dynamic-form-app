import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%`, backgroundColor: progress === 100 ? "green" : "blue" }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
