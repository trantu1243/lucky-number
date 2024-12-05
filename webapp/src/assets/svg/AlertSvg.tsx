import React from 'react';

export const AlertSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={18}
      height={18}
      fill='none'
    >
      <rect
        width={18}
        height={18}
        fill='#EC5'
        rx={9}
      />
      <g
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M8.288 5.608 4.758 11.5a.833.833 0 0 0 .713 1.25h7.058a.833.833 0 0 0 .713-1.25l-3.53-5.892a.833.833 0 0 0-1.424 0v0ZM9 7.75v1.667M9 11.083h.004' />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M4 4h10v10H4z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
