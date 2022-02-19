import React from "react";

const styles = {
  width: '1000px',
  maxWidth: '60%',
  height: '100%',
  border: '4px solid #000',
  margin: '40px auto',
}

export const ResultImg = ({ gif }) => {
  return <img style={styles} src={gif} alt="processed-gif"/>;
};
