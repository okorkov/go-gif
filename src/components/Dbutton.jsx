import React from "react";
import Button from '@mui/material/Button';

export const Dbutton = ({ gif, download }) => {
  return (
    <div>
      <Button variant="contained" href={gif} download onClick={(e) => download(e)}>Download Gif</Button>
    </div>
  );
};
