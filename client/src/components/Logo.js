import React from 'react';

const Logo = () => {
  // hexagon with II as custom logo
  return (
    <div style={{
      width: '50px',
      height: '50px',
      backgroundColor: 'lightblue',
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '28px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
    }}>
      II
    </div>
  );
};

export default Logo;
