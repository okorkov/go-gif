import React, { useState } from "react";
import Button from '@mui/material/Button';
import NotSupportedDialog from './NotSupportedDialog';


export const ButtonUI = ({ convertToGif, ready }) => {
  const [disabled, setDisabled] = useState(false);

  // dialog state
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    if(ready){
      convertToGif()
    } else {
      setDisabled(true);
      // open not supporting dialog
      handleClickOpen();
    }
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={disabled}
        style={disabled ? {} : {background: 'rgb(0, 75, 124)'}}
        >
          Convert
      </Button>
      <NotSupportedDialog handleClickOpen={handleClickOpen} handleClose={handleClose} open={open}/>
    </>
  );
};
