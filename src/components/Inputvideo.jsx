import React from "react";

const styles = {
  width: '40%',
  margin: '20px',
  border: '1px dashed #045ca3'
}

export const InputVideo = ({ video }) => {
  return <video controls width="500" style={styles} src={URL.createObjectURL(video)} />;
};