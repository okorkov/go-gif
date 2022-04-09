import React from "react";

const styles = {
  width: '40%',
  margin: '20px',
  border: '3px solid #045ca3',
  boxShadow: '7px 4px 8px 0 rgba(0, 0, 0, 0.2), 10px 6px 20px 0 rgba(0, 0, 0, 0.19)'
}

export const InputVideo = ({ video, setFPS }) => {

  React.useEffect(() => {
    const uploadedVideo = document.getElementById("video");
    uploadedVideo.onloadedmetadata = function() {
      assingFPSBasedOffDuration(this.duration);
    };
  });

  const assingFPSBasedOffDuration = (duration) => {
    switch (true) {
      case (duration >= 0.1 &&  duration <= 10): // 0.1 - 5 sec
        setFPS(15);
        break;
        case (duration >= 10.1 &&  duration <= 15): // 5.1 - 15 sec
        setFPS(12);
        break;
        case (duration >= 15.1 &&  duration <= 25): // 15.1 - 25 sec
        setFPS(10);
        break;
        case (duration >= 25.1 &&  duration <= 30): // 25.1 - 30 sec
        setFPS(8);
        break;
        case (duration >= 30.1 &&  duration <= 40): // 30.1 - 40 sec
        setFPS(6);
        break;
        case (duration >= 40.1 &&  duration <= 50): // 40.1 - 50 sec
        setFPS(5);
        break;
        case (duration >= 50.1 &&  duration <= 60): // 50.1 - 60 sec
        setFPS(4);
        break;
      default:
        setFPS(3);
    }
  }

  return <video id="video" controls width="500" style={styles} src={URL.createObjectURL(video)} />;
};