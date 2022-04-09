import React from "react";

const styles = {
  width: '1000px',
  maxWidth: '60%',
  height: '100%',
  border: '4px solid #000',
  marginBottom: '40px',
  boxShadow: '7px 4px 8px 0 rgba(0, 0, 0, 0.2), 10px 6px 20px 0 rgba(0, 0, 0, 0.19)'
}

export const ResultImg = ({ gif, FPS, videoDuration }) => {
  return (
    <>
      <p className="lead">Processing Frame Rate: <strong>{FPS}</strong> FPS From <strong>{videoDuration}</strong> Second Video.</p>
      <img style={styles} src={gif} alt="processed-gif"/>
    </>
  );
};
