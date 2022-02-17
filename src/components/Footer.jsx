import React from 'react';

const Footer = ({isFixed}) => {
  const styles = isFixed ?
    {position: 'fixed', bottom: '0', left: '0', textAlign: 'center', width: '100%', paddingTop: '2%'}
    :
    {textAlign: 'center', width: '100%', paddingTop: '2%'}

  return (
    <footer style={styles}>
      <p style={{color: '#004b7c', fontSize: '18px'}}>© {new Date().getFullYear()} | made by @aokarkau</p>
    </footer>
  );
}

export default Footer;
