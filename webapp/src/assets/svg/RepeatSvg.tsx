import React from 'react';

export const RepeatSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={30}
      height={30}
      fill='none'
    >
      <rect
        width={30}
        height={30}
        fill='#fff'
        rx={15}
      />
      <g
        stroke='#040325'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      >
        <path d='M18.333 7.667 21 10.333 18.333 13' />
        <path d='M9 14.333V13a2.667 2.667 0 0 1 2.667-2.667H21M11.667 22.333 9 19.667 11.667 17' />
        <path d='M21 15.667V17a2.667 2.667 0 0 1-2.667 2.667H9' />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M7 7h16v16H7z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
