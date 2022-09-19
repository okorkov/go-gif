/* eslint-disable react/jsx-props-no-spreading */
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import "react-step-progress-bar/styles.css";

import DownloadButton from "./components/DownloadButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InitLoader from "./components/InitLoader";
import InputFile from "./components/Inputfile";
import InputVideo from "./components/Inputvideo";
import ResultImg from "./components/Resultimg";
import HelpIcon from "./components/help-modal/HelpIcon";

// Create the FFmpeg instance and load it
const ffmpeg = createFFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

function LinearProgressWithLabel({ value, ...rest }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...rest} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function App() {
  const [FPS, setFPS] = useState(10);
  const [videoDuration, setVideoDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [videoName, setVideoName] = useState("");
  const [gif, setGif] = useState();
  const [convertingProgress, setConvertingProgress] = useState(null);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const convertToGif = async () => {
    // Write the .mp4 to the FFmpeg file system
    ffmpeg.FS("writeFile", "video1.mp4", await fetchFile(video));

    ffmpeg.setProgress(({ ratio }) => {
      setConvertingProgress(ratio.toFixed(2).split(".")[1]);
      /*
       * ratio is a float number between 0 to 1.
       */
    });
    // Run the FFmpeg command-line tool, converting
    // the .mp4 into .gif file

    await ffmpeg.run(
      "-i",
      "video1.mp4",
      "-filter_complex",
      `[0:v] fps=${FPS},scale=w=600:h=-1,split [a][b];[a] palettegen=stats_mode=full [p];[b][p] paletteuse=new=1`,
      "out.gif"
    );
    // Read the .gif file back from the FFmpeg file system
    const data = ffmpeg.FS("readFile", "out.gif");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setVideoName(video.name);
    setGif(url);
    document.querySelectorAll("input")[0].value = "";
    setVideo(null);
    setConvertingProgress(null);
  };

  const download = async (e) => {
    try {
      const response = await fetch(e.target.href, {
        method: "GET",
        headers: {},
      });
      const buffer = await response.arrayBuffer();
      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <div className="main-content-footer-excluded">
        <Header />
        <HelpIcon />
        {video && !convertingProgress && (
          <InputVideo
            video={video}
            setFPS={setFPS}
            videoDuration={videoDuration}
            setVideoDuration={setVideoDuration}
          />
        )}
        {gif && (
          <>
            <ResultImg gif={gif} FPS={FPS} videoDuration={videoDuration} />
            <DownloadButton
              gif={gif}
              download={download}
              videoName={videoName}
            />
          </>
        )}

        <InputFile
          setVideo={setVideo}
          convertToGif={convertToGif}
          setGif={setGif}
          gif={gif}
          convertingProgress={convertingProgress}
          video={video}
          ready={ready}
          setVideoDuration={setVideoDuration}
        />

        {convertingProgress && (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              margin: "6%",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "800px" }}>
              {convertingProgress === "00" ? (
                <>
                  <InitLoader />
                  <p className="blockquote-footer" style={{ paddingTop: "5%" }}>
                    Conversion will start after video upload
                  </p>
                </>
              ) : (
                <LinearProgressWithLabel value={convertingProgress} />
              )}
              <Snackbar
                open={convertingProgress === "00"}
                message="Uploading your video before processing, please wait..."
                key=""
              />
            </Box>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
