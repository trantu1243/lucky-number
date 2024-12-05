import React from 'react';

export const CarSvg: React.FC = () => {
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
        fill='#FFF7F2'
        rx={20}
      />
      <path
        stroke='#040325'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        d='M22.15 23.938h3.358M14.572 23.938h3.359'
      />
      <mask
        id='a'
        width={24}
        height={24}
        x={8}
        y={8}
        maskUnits='userSpaceOnUse'
        style={{
          maskType: 'luminance',
        }}
      >
        <path
          fill='#fff'
          d='M8 8h24v24H8V8Z'
        />
      </mask>
      <g
        stroke='#040325'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        mask='url(#a)'
      >
        <path d='M29.258 23.938h2.273v-1.875A3.562 3.562 0 0 0 27.97 18.5h-1.472l-1.857-2.713a4.97 4.97 0 0 0-4.1-2.162h-3.617c-1.64 0-3.173.809-4.1 2.162L10.966 18.5a3.422 3.422 0 0 0-2.497 3.295V23c0 .518.42.938.937.938h1.416' />
        <path d='M14.572 24.5a1.875 1.875 0 1 0-3.75 0 1.875 1.875 0 0 0 3.75 0ZM29.258 24.5a1.875 1.875 0 1 0-3.75 0 1.875 1.875 0 0 0 3.75 0ZM24.225 18.5l-1.132-1.654A3.093 3.093 0 0 0 20.54 15.5h-1.267v3h4.952ZM17.398 15.5h-.475a3.093 3.093 0 0 0-2.553 1.346L13.238 18.5h4.16v-3ZM19.273 20.387h.555' />
      </g>
    </svg>
  );
};
