import React from 'react';
import HelpModal from './HelpModal';


const Helpicon = () => {
  return (
    <div style={{position: 'fixed', right: '15px', top: '15px'}}>
      <HelpModal />
    </div>
  );
}

export default Helpicon;
