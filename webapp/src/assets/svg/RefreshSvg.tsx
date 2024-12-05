import React from 'react';

export const RefreshSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={17}
      fill='none'
    >
      <g
        stroke='#4C4C60'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      >
        <path d='M.667 13.833v-4h4M15.333 3.167v4h-4' />
        <path d='M2.34 6.5a6 6 0 0 1 9.9-2.24l3.093 2.907M.667 9.833 3.76 12.74a6 6 0 0 0 9.9-2.24' />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M0 .5h16v16H0z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
