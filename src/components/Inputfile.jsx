import React from "react";
import { ButtonUI } from './Button';

export const InputFile = ({ setVideo, setGif, gif, convertingProgress, video, convertToGif, setVideoDuration, ready }) => {
  const styles = {
    display: 'flex',
    left: '0',
    right: '0',
    margin: '50px auto',
    minWidth: '50%',
    maxWidth: '700px',
    borderRadius: '18px',
    padding: '10px'
  }

  const handleImageChange = (e) => {
    if (e.target.files[0].size > 5e+8) {
      alert('File is too big, no files over 500 MB');
      document.querySelectorAll('input')[0].value = '';
      return null;
    }

    setVideo(e.target.files?.item(0));
    setVideoDuration(0);
    
    if(gif) {
      setGif(null);
    }
  }

  return (
    <div style={convertingProgress ? {display: 'none'} : styles}>
      <div class="input-group mb-3">
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="inputGroupFile02" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => handleImageChange(e)}/>
          <label class="custom-file-label" for="inputGroupFile02">{video ? 'Choose Different Video' : 'Click Here To Choose File'}</label>
        </div>
        <div class="input-group-append">
          {video && <ButtonUI convertToGif={convertToGif} ready={ready}/>}
        </div>
      </div>
    </div>
  );
};
