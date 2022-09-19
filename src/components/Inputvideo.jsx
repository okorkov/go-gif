import { useEffect } from "react";

const assingFPSBasedOffDuration = (duration, setFPS) => {
  switch (true) {
    case duration >= 0.1 && duration <= 10: // 0.1 - 5 sec
      setFPS(10);
      break;
    case duration >= 10.1 && duration <= 15: // 5.1 - 15 sec
      setFPS(8);
      break;
    case duration >= 15.1 && duration <= 25: // 15.1 - 25 sec
      setFPS(7);
      break;
    case duration >= 25.1 && duration <= 30: // 25.1 - 30 sec
      setFPS(6);
      break;
    case duration >= 30.1 && duration <= 40: // 30.1 - 40 sec
      setFPS(5);
      break;
    case duration >= 40.1 && duration <= 50: // 40.1 - 50 sec
      setFPS(4);
      break;
    case duration >= 50.1 && duration <= 60: // 50.1 - 60 sec
      setFPS(3);
      break;
    default:
      setFPS(5);
  }
};

export default function InputVideo({
  video,
  setFPS,
  videoDuration,
  setVideoDuration,
}) {
  useEffect(() => {
    const uploadedVideo = document.getElementById("video");
    uploadedVideo.onloadedmetadata = () => {
      assingFPSBasedOffDuration(videoDuration, setFPS);
      setVideoDuration(Math.round(videoDuration));
    };
  }, [setFPS, setVideoDuration, videoDuration]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      id="video"
      controls
      className="media-output"
      src={URL.createObjectURL(video)}
    />
  );
}
