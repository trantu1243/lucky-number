import React from 'react';

export const UserSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={34}
      height={34}
      fill='none'
    >
      <rect
        width={34}
        height={34}
        fill='#FFD9C3'
        rx={6}
      />
      <path
        stroke='#FF8A71'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.2}
        d='M22.333 23v-1.333A2.667 2.667 0 0 0 19.667 19h-5.334a2.667 2.667 0 0 0-2.666 2.667V23M17 16.333A2.667 2.667 0 1 0 17 11a2.667 2.667 0 0 0 0 5.333Z'
      />
    </svg>
  );
};
