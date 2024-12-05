import React from 'react';

export const ShoppingCartSvg: React.FC = () => {
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
        stroke='#040325'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      >
        <path d='M16.5 28.333a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM25.667 28.333a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM9.833 10.833h3.334L15.4 21.992a1.667 1.667 0 0 0 1.667 1.341h8.1a1.666 1.666 0 0 0 1.666-1.341L28.167 15H14' />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M9 10h20v20H9z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
