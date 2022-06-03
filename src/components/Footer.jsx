import React from 'react';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';

const FooterComponent = ({}) => {
  return (
    <>
      <Footer
        style={{marginTop: '8%'}}
        backgroundColor="rgb(0, 75, 124)"
        columns={[
          {
            icon: (
              <img src="https://aokarkau.com/logo-white.png" />
            ),
            title: 'Alex Okarkau',
            url: 'https://aokarkau.com',
            description: '',
            openExternal: true,
            items: [{
              title: 'aokarkau.com',
              url: 'https://aokarkau.com',
              openExternal: true,
              description: 'personal website'
            }]
          },
          {          
            icon: (
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png?20140125013055" />
            ),
            title: 'GoLinks',
            items: [{
              title: 'go/gifin',
              url: 'https://gif-in.web.app',
              openExternal: true,
              description: ''
            }]
          }
        ]}
      bottom={`MIT Licensed. © ${new Date().getFullYear()} Alex Okarkau`}
      />
    </>
  );
}

export default FooterComponent;
