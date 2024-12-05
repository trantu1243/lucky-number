import React from 'react';

export const MessageSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={40}
      height={40}
      fill='none'
    >
      <rect
        width={40}
        height={40}
        fill='#fff'
        rx={20}
      />
      <path
        stroke='#040325'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M26 22a1.333 1.333 0 0 1-1.333 1.333h-8L14 26V15.333A1.334 1.334 0 0 1 15.333 14h9.334A1.334 1.334 0 0 1 26 15.333V22Z'
      />
    </svg>
  );
};
