import React from 'react';

export const FaceIDSvg: React.FC = () => {
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
      <g>
        <path
          fill='#040325'
          d='M14.667 22.667a.666.666 0 0 1 .662.588l.004.078v1.334h1.334a.667.667 0 0 1 .078 1.328l-.078.005h-1.334a1.333 1.333 0 0 1-1.33-1.233l-.003-.1v-1.334a.667.667 0 0 1 .667-.666Zm10.666 0a.667.667 0 0 1 .667.666v1.334A1.334 1.334 0 0 1 24.667 26h-1.334a.667.667 0 1 1 0-1.333h1.334v-1.334a.667.667 0 0 1 .666-.666Zm-3.466-1.429a.668.668 0 1 1 .933.952 3.99 3.99 0 0 1-2.8 1.143 3.99 3.99 0 0 1-2.8-1.143.666.666 0 1 1 .933-.952c.498.49 1.169.763 1.867.762.727 0 1.385-.29 1.867-.762Zm-4.2-3.905a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm4.666 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM16.667 14a.667.667 0 1 1 0 1.333h-1.334v1.334a.667.667 0 0 1-1.333 0v-1.334A1.334 1.334 0 0 1 15.333 14h1.334Zm8 0A1.334 1.334 0 0 1 26 15.333v1.334a.667.667 0 1 1-1.333 0v-1.334h-1.334a.667.667 0 0 1 0-1.333h1.334Z'
        />
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
