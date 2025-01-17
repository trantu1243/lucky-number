import React from 'react';
import { theme } from '../../constants';

export const TranslateSvg: React.FC = () => {
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
          fill={theme.colors.mainColor}
          d='M26 14.667h-6.667l-.666-2H14c-.733 0-1.333.6-1.333 1.333v10c0 .733.6 1.333 1.333 1.333h5.333l.667 2h6c.733 0 1.333-.6 1.333-1.333V16c0-.733-.6-1.333-1.333-1.333Zm-9.333 8a3.334 3.334 0 0 1 0-6.667c.9 0 1.653.333 2.233.867l-.88.846a1.923 1.923 0 0 0-1.353-.52c-1.16 0-2.1.96-2.1 2.14 0 1.18.94 2.14 2.1 2.14 1.34 0 1.893-.96 1.946-1.606h-1.946v-1.14h3.12c.046.206.08.406.08.68 0 1.906-1.274 3.26-3.2 3.26Zm4.113-3.614h2.467a6.679 6.679 0 0 1-1.367 2.314 7.5 7.5 0 0 1-.573-.734l-.527-1.58Zm5.553 6.614c0 .366-.3.666-.666.666h-4.334l1.334-1.666-.694-2.067 2.067 2.067.613-.614-2.2-2.166.014-.014a7.44 7.44 0 0 0 1.6-2.813h1.266v-.867h-3.02v-.86h-.86v.86h-.96l-.853-2.526h6.027c.366 0 .666.3.666.666v9.334Z'
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
