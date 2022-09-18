import React from "react";

export const ResultImg = ({ gif, FPS, videoDuration }) => {
  return (
    <>
      <p className="lead">Frame Rate: <strong>{FPS}</strong> FPS From <strong>{videoDuration}</strong> Second Video.</p>
      <img className="media-output" src={gif} alt="processed-gif"/>
    </>
  );
};
