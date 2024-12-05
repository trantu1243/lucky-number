import React from 'react';

export const HelpCircleSvg: React.FC = () => {
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
        <path d='M20 26.667a6.667 6.667 0 1 0 0-13.334 6.667 6.667 0 0 0 0 13.334Z' />
        <path d='M18.06 18a2 2 0 0 1 3.887.667c0 1.333-2 2-2 2M20 23.333h.007' />
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
