import React, { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { ButtonUI } from "./components/Button";
import { InputFile } from "./components/InputFile";
import { Header } from "./components/Header";
import { ResultImg } from "./components/ResultImg";
import { InputVideo } from "./components/InputVideo";
import { DownloadButton } from "./components/DownloadButton";
import Footer from "./components/Footer";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import HelpIcon from './components/help-modal/HelpIcon';

// Create the FFmpeg instance and load it
const ffmpeg = createFFmpeg({ log: true, corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js', });

function App() {
  const [FPS, setFPS] = useState(10);
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [isFixed, setIsFixed] = useState(true);
  const [convertingProgress, setConvertingProgress] = useState(null);
  const [showNotSupportedMessage, setShowNotSupportedMessage] = useState(false);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
    setIsFixed(true);
    const FFMPEG_NOT_SUPPORTED_MESSAGE = setInterval(function () {
      setShowNotSupportedMessage(true);
     return  clearInterval(FFMPEG_NOT_SUPPORTED_MESSAGE);
   }, 4000);
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
      '-i',
      'video1.mp4',
      '-filter_complex',
      `[0:v] fps=${FPS},scale=1000:-1,split [a][b];[a] palettegen=stats_mode=full [p];[b][p] paletteuse=new=1`,
      'out.gif'
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
    setIsFixed(false);
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
    <div className="App" style={{textAlign: "center"}}>
    <Header />
    <HelpIcon />
    {(video && !convertingProgress) && <InputVideo video={video} setFPS={setFPS}/>}
    <InputFile setVideo={setVideo} convertToGif={convertToGif} setGif={setGif} gif={gif} convertingProgress={convertingProgress} setIsFixed={setIsFixed}/>
    
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

    {video && <ButtonUI convertToGif={convertToGif} convertingProgress={convertingProgress}/>}
    {gif && <ResultImg gif={gif} />}
    {gif && <DownloadButton gif={gif} download={download} />}
    <Footer isFixed={isFixed}/>
    </div>
  ) : (
    <>
      <Box sx={{ display: 'flex' }} style={{position: 'fixed', top: '45%', left: '45%', zIndex: '9999', zoom: '3'}}>
        <CircularProgress />
      </Box>
      {
        showNotSupportedMessage ?
          <div style={{ textAlign: 'center'}}>
            <p>Seems Like Your Browser Doesn't Support it yet...</p>
            <p>Please Use Google Chrome</p>
          </div>
          :
          null
      }
    </>
  );
}

export default App;
