import React from 'react';

export const Background: React.FC = () => {
  return (
    <img
      src={require('../assets/other/01.png')}
      alt='SignIn'
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        zIndex: -1,
      }}
    />
  );
};
