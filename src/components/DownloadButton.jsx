import React from "react";
import Button from '@mui/material/Button';

export const DownloadButton = ({ gif, download }) => {
  const isFirefox = typeof InstallTrigger !== 'undefined';
  return (
    <div>
      {
        isFirefox ?
        <Button variant="contained" href={gif} download="processed_gif.gif" onClick={(e) => download(e)}>Download Gif</Button>
        :
        <Button variant="contained" href={gif} download onClick={(e) => download(e)}>Download Gif</Button>
      }
    </div>
  );
};
