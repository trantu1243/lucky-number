import React from 'react';

export const PhoneSvg: React.FC = () => {
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
      <g>
        <path
          stroke='#FF8A71'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.2}
          d='M15.248 22.982a3.184 3.184 0 0 1-3.992-.44l-.449-.439a1.078 1.078 0 0 1 0-1.506l1.906-1.886a1.068 1.068 0 0 1 1.497 0 1.078 1.078 0 0 0 1.507 0l2.994-2.994a1.059 1.059 0 0 0 0-1.507 1.067 1.067 0 0 1 0-1.497l1.896-1.896a1.078 1.078 0 0 1 1.506 0l.44.45a3.184 3.184 0 0 1 .439 3.99 28.88 28.88 0 0 1-7.744 7.725Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M10 10h14v14H10z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
