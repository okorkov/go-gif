import React from 'react';


const Helpcontent = () => {
  return (
    <div>
      <h4>You can use Screenshot or QuickTime player to make a video recording of the entire screen or just a selected portion of it on Mac.</h4>
      <p>Use the Screenshot toolbar</p>
      <img src="./toolbar.png" alt="toolbar" style={{width: "100%"}}/>
      <p>To view the Screenshot toolbar, press these three keys together: Shift, Command, and 5. You will see onscreen controls for recording the entire screen, recording a selected portion of the screen, or <a href="https://support.apple.com/kb/HT201361" target="_blank" rel="noreferrer"> capturing a still image</a> of your screen:</p>
      <img src="screen_record.jpeg" alt="toolbar" style={{width: "100%", paddingBottom: "3%"}}/>

      <div style={{paddingTop: '5%'}}/>
      <h4>How to record screen on Windows.</h4>
      <p>Hit the Windows <strong> Key + Alt + R </strong>to start screen recording. A small recording widget showing how long you've been recording appears somewhere on the screen, most likely in a corner.</p>
      <img src="./window_screen_recording.png" alt="window screen recording" style={{width: "100%"}}/>

    </div>
  );
}

export default Helpcontent;