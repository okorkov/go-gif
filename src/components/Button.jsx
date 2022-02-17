import React from "react";
import Button from '@mui/material/Button';


export const ButtonUI = ({ convertToGif, convertingProgress }) => {
  return (
    <>
      {
        convertingProgress ? 
        <Button variant="contained" disabled>Converting...</Button>
        :
        <Button variant="contained" onClick={convertToGif}>Convert</Button>
      }
    </>
  );
};
