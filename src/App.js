import React, { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { InputFile } from "./components/InputFile";
import { Header } from "./components/Header";
import { ResultImg } from "./components/ResultImg";
import { InputVideo } from "./components/InputVideo";
import { DownloadButton } from "./components/DownloadButton";
import Footer from "./components/Footer";
import Box from '@mui/material/Box';
import "react-step-progress-bar/styles.css";
import HelpIcon from './components/help-modal/HelpIcon';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Create the FFmpeg instance and load it
const ffmpeg = createFFmpeg({ log: true, corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js', });

function App() {
  const [FPS, setFPS] = useState(10);
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [convertingProgress, setConvertingProgress] = useState(null);
  const [showNotSupportedMessage, setShowNotSupportedMessage] = useState(false);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
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

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }


  return ready ? (
    <div className="App" style={{textAlign: "center"}}>
    <Header />
    <HelpIcon />
    {(video && !convertingProgress) && <InputVideo video={video} setFPS={setFPS}/>}
    {gif && <ResultImg gif={gif} FPS={FPS}/>}
    {gif && <DownloadButton gif={gif} download={download} />}

    <InputFile setVideo={setVideo} convertToGif={convertToGif} setGif={setGif} gif={gif} convertingProgress={convertingProgress} video={video}/>

    {
      convertingProgress ?
      <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', margin: '6%'}}>
      <Box sx={{ width: '100%', maxWidth: '800px' }}>
        { convertingProgress === "00" ?
          <>
            <CircularProgress />
            <p className="blockquote-footer" style={{paddingTop: '5%'}}>Conversion will start after video upload</p>
          </>
          :
          <LinearProgressWithLabel value={convertingProgress} />
        }
        {convertingProgress === "00" ? 
          <Snackbar
            open={convertingProgress === "00"}
            message={"Uploading your video before processing, please wait..."}
            key=""
          />
          : null}
      </Box>
      </div>
      :
      null
    }
    
    <Footer />

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
