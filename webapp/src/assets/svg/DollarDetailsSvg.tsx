import React from 'react';

export const DollarDetailsSvg: React.FC = () => {
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
        <path d='M8 1.167v14.666M11.333 3.833h-5a2.333 2.333 0 1 0 0 4.667h3.334a2.333 2.333 0 0 1 0 4.667H4' />
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
