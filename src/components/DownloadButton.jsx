import React from "react";
import Button from '@mui/material/Button';

export const DownloadButton = ({ gif, download, videoName }) => {
  const isFirefox = typeof InstallTrigger !== 'undefined';
  return (
    <div>
      {
        isFirefox ?
        <Button variant="contained" href={gif} download={`${videoName}.gif`} style={{background: 'rgb(0, 75, 124)'}} onClick={(e) => download(e)}>Looks Good! Download Gif</Button>
        :
        <Button variant="contained" href={gif} download={`${videoName}.gif`} target="_blank" style={{background: 'rgb(0, 75, 124)'}} onClick={(e) => download(e)}>Looks Good! Download Gif</Button>
      }
    </div>
  );
};
