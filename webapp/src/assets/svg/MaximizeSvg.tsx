import React from 'react';

export const MaximizeSvg: React.FC = () => {
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
        d='M17.333 14h-2A1.334 1.334 0 0 0 14 15.333v2m12 0v-2A1.334 1.334 0 0 0 24.667 14h-2m0 12h2A1.334 1.334 0 0 0 26 24.667v-2m-12 0v2A1.334 1.334 0 0 0 15.333 26h2'
      />
    </svg>
  );
};
