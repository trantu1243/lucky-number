import React from 'react';

export const DollarSignSvg: React.FC = () => {
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
        <path d='M15 7.667v14.666M18.333 10.333h-5a2.333 2.333 0 1 0 0 4.667h3.334a2.333 2.333 0 0 1 0 4.667H11' />
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
