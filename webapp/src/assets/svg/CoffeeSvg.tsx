import React from 'react';

export const CoffeeSvg: React.FC = () => {
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
        d='M25 16.667h.833a3.334 3.334 0 0 1 0 6.666H25M11.667 16.667H25v7.5a3.333 3.333 0 0 1-3.333 3.333H15a3.333 3.333 0 0 1-3.333-3.333v-7.5ZM15 10.833v2.5M18.333 10.833v2.5M21.667 10.833v2.5'
      />
    </svg>
  );
};
