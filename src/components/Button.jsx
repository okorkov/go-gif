import React from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


export const ButtonUI = ({ convertToGif, convertingProgress }) => {
  const refinedPercents = (convertingProgress && convertingProgress[0] === '0') ? convertingProgress[1] : convertingProgress;

  return (
    <>
      {
        convertingProgress ? 

        <Button variant="contained" disabled>{refinedPercents === '0' ? (<> <p>Starting Conversion</p> <CircularProgress style={{zoom: '0.5', marginLeft: '15px'}}/> </>) : `Converted ${refinedPercents}%`}</Button>
        :
        <Button variant="contained" onClick={convertToGif}>Convert</Button>
      }
    </>
  );
};
