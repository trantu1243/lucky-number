import React from 'react';

export const TransactionCheckSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={60}
      height={60}
      fill='none'
    >
      <rect
        width={60}
        height={60}
        fill='#55ACEE'
        rx={30}
      />
      <path
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M38.533 23.6 26.8 35.333 21.467 30'
      />
    </svg>
  );
};
