import React from 'react';

export const MessageCircelSvg: React.FC = () => {
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
      <path
        stroke='#040325'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M26 19.667a5.587 5.587 0 0 1-.6 2.533 5.666 5.666 0 0 1-5.067 3.133 5.588 5.588 0 0 1-2.533-.6L14 26l1.267-3.8a5.587 5.587 0 0 1-.6-2.533A5.667 5.667 0 0 1 17.8 14.6a5.587 5.587 0 0 1 2.533-.6h.334A5.654 5.654 0 0 1 26 19.333v.334Z'
      />
    </svg>
  );
};
