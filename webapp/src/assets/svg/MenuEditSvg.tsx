import React from 'react';

export const MenuEditSvg: React.FC = () => {
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
        <path d='M19.333 14.667h-4.666A1.333 1.333 0 0 0 13.333 16v9.333a1.333 1.333 0 0 0 1.334 1.334H24a1.333 1.333 0 0 0 1.333-1.334v-4.666' />
        <path d='M24.333 13.667a1.414 1.414 0 1 1 2 2L20 22l-2.667.667L18 20l6.333-6.333Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M12 12h16v16H12z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
