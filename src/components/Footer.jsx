import React from 'react';

const Footer = ({}) => {
  const styles = {textAlign: 'center', width: '100%', paddingTop: '2%'};

  return (
    <footer style={styles}>
      <p className="display-4" style={{color: '#004b7c', fontSize: '18px'}}>© {new Date().getFullYear()} | made by @aokarkau</p>
    </footer>
  );
}

export default Footer;
