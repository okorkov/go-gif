import React from "react";

export const InputFile = ({ setVideo, setGif, gif, convertingProgress, video }) => {
  const styles = {
    display: 'flex',
    left: '0',
    right: '0',
    margin: '50px auto',
    width: '50%',
    maxWidth: '700px',
    borderRadius: '18px',
    padding: '10px'
  }

  const handleImageChange = (e) => {
    if (e.target.files[0].size > 204857600) {
      alert('File is too big, no files over ');
      document.querySelectorAll('input')[0].value = '';
      return null;
    }

    setVideo(e.target.files?.item(0));
    
    if(gif) {
      setGif(null);
    }
  }

  return (
    <div style={convertingProgress ? {display: 'none'} : styles}>
      <div class="input-group mb-3">
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="inputGroupFile02" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => handleImageChange(e)}/>
          <label class="custom-file-label" for="inputGroupFile02">{video ? 'you can choose another file by clicking here' : 'click here to choose a file'}</label>
        </div>
      </div>
    </div>
  );
};
