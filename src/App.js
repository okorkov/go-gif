import React, { useState, useEffect } from "react";
import "./App.css";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { ButtonUI } from "./components/Button";
import { Inputfile } from "./components/Inputfile";
import { Header } from "./components/Header";
import { Resultimg } from "./components/Resultimg";
import { Inputvideo } from "./components/Inputvideo";
import { Dbutton } from "./components/Dbutton";
import Footer from "./components/Footer";
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
  const [isFixed, setIsFixed] = useState(true);
  const [convertingProgress, setConvertingProgress] = useState(null);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
    setIsFixed(true)
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
    await ffmpeg.run('-i', 'video1.mp4', '-vf', 'fps=15,scale=1200:-1,smartblur=ls=-1,crop=iw:ih-2:0:0', 'out.gif')
    // await ffmpeg.run('-i', 'video1.mp4', '-filter_complex', '[0:v] fps=15,scale=w=1000:h=-1,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1', 'out.gif')


    
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
    <div className="App">
    <Header />
    {(video && !convertingProgress) && <Inputvideo video={video} />}
    <Inputfile setVideo={setVideo} convertToGif={convertToGif} setGif={setGif} gif={gif} convertingProgress={convertingProgress} setIsFixed={setIsFixed}/>
    
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
    {gif && <Resultimg gif={gif} />}
    {gif && <Dbutton gif={gif} download={download} />}
    <Footer isFixed={isFixed}/>
    </div>
  ) : (
    
    <Box sx={{ display: 'flex' }} style={{position: 'fixed', top: '45%', left: '45%', zIndex: '9999', zoom: '3'}}>
      <CircularProgress />
    </Box>
  );
}

export default App;
