import React, { useState, useEffect } from "react";
import "./App.css";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Button } from "./components/Button";
import { Inputfile } from "./components/Inputfile";
import { Header } from "./components/Header";
import { Resultimg } from "./components/Resultimg";
import { Inputvideo } from "./components/Inputvideo";
import { Dbutton } from "./components/Dbutton";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

// Create the FFmpeg instance and load it
const ffmpeg = createFFmpeg({ log: true, corePath: "/ffmpeg_core_dist/ffmpeg-core.js" });

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
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
      setConvertingProgress(ratio.toFixed(2).split('.')[1]);
      /*
       * ratio is a float number between 0 to 1.
       */
    });

    // Run the FFmpeg command-line tool, converting
    // the .mp4 into .gif file
    await ffmpeg.run(
    "-i",
    "video1.mp4",
    "-t",
    "2.5",
    "-ss",
    "2.0",
    "-f",
    "gif",
    "out.gif"
    )
    
    // Read the .gif file back from the FFmpeg file system
    const data = ffmpeg.FS("readFile", "out.gif");
    const url = URL.createObjectURL(
    new Blob([data.buffer], { type: "image/gif" })
    );
    setGif(url);
    document.querySelectorAll('input')[0].value = '';
    setVideo(null);
    setConvertingProgress(null);
  };

  const download = (e) => {
    fetch(e.target.href, {
    method: "GET",
    headers: {},
    })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download");
      document.body.appendChild(link);
      link.click();
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return ready ? (
    <div className="App">
    <Header />
    {(video && !convertingProgress) && <Inputvideo video={video} />}
    <Inputfile setVideo={setVideo} convertToGif={convertToGif} setGif={setGif} gif={gif}/>
    
    {
      convertingProgress ?
      <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', margin: '6%'}}>
        <ProgressBar
        percent={convertingProgress}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        width="60%"
        />
      </div>
      :
      null
    }

    {video && <Button convertToGif={convertToGif} />}
    {gif && <Resultimg gif={gif} />}
    {gif && <Dbutton gif={gif} download={download} />}
    </div>
  ) : (
    
    <Box sx={{ display: 'flex' }} style={{position: 'fixed', top: '45%', left: '45%', zIndex: '9999', zoom: '3'}}>
      <CircularProgress />
    </Box>
  );
}

export default App;
