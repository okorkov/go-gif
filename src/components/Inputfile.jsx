import React from "react";

export const InputFile = ({ setVideo, setGif, gif, convertingProgress, setIsFixed }) => {
  const styles = {
    display: 'flex',
    left: '0',
    right: '0',
    margin: '50px auto',
    width: '30%',
    border: '2px dashed #000',
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
    setIsFixed(true);
  }

  return (
    <div style={convertingProgress ? {display: 'none'} : styles}>
      <input type="file" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => handleImageChange(e)} />
    </div>
  );
};
