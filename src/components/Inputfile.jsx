import React from "react";
import styled from "styled-components";

const Section = styled.div`
display: flex;
left: 0;
right: 0;
margin: 50px auto;
width: 30%;
border: 2px dashed #000;
border-radius: 18px;
padding: 10px;
`;

export const Inputfile = ({ setVideo, setGif, gif, convertingProgress, setIsFixed }) => {
  const handleImageChange = (e) => {
    if (e.target.files[0].size > 104857600) {
      alert('File is too big, no files over ');
      document.querySelectorAll('input')[0].value = '';
      return null;
    }

    setVideo(e.target.files?.item(0));
    if(gif) {
      setGif(null);
    }
    setIsFixed(true);
  }

  return (
    <Section style={convertingProgress ? {display: 'none'} : {}}>
      <input type="file" onChange={(e) => handleImageChange(e)} />
    </Section>
  );
};
