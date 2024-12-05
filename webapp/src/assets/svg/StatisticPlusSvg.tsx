import React from 'react';

export const StatisticPlusSvg: React.FC = () => {
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
      <g
        fill='#040325'
        fillRule='evenodd'
        clipRule='evenodd'
      >
        <path d='M20 11a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V12a1 1 0 0 1 1-1Z' />
        <path d='M11 20a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M11 11h18v18H11z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
