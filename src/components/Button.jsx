import React from "react";
import Button from '@mui/material/Button';


export const ButtonUI = ({ convertToGif, convertingProgress }) => {
  const refinedPercents = (convertingProgress && convertingProgress[0] === '0') ? convertingProgress[1] : convertingProgress;

  return (
    <>
      {
        convertingProgress ? 
        <Button variant="contained" disabled>Converted {refinedPercents}%</Button>
        :
        <Button variant="contained" onClick={convertToGif}>Convert</Button>
      }
    </>
  );
};
