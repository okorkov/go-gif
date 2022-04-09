import React from "react";
import Button from '@mui/material/Button';


export const ButtonUI = ({ convertToGif }) => {

  return (
    <>
      <Button variant="contained" style={{background: 'rgb(0, 75, 124)'}} onClick={convertToGif}>Convert</Button>
    </>
  );
};
