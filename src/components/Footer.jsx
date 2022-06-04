import React from 'react';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';

const FooterComponent = ({}) => {
  return (
    <>
      <Footer
        backgroundColor="rgb(0, 75, 124)"
        columns={[
          {
            icon: (
              <img src="./aokarkau_logo.png" alt="Alex Okarkau Logo"/>
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
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" alt="Linkedin Logo"/>
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
