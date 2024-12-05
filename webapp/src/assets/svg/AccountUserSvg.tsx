import React from 'react';

type Props = {
  style?: React.CSSProperties;
};

export const AccountUserSvg: React.FC<Props> = ({style}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={100}
      height={100}
      fill='none'
      style={{...style}}
    >
      <path
        fill='#FFD9C3'
        d='M20 77.667c0-11.598 9.402-21 21-21s21 9.402 21 21H20Z'
      />
      <path
        fill='#55ACEE'
        d='m56.666 57.667 14-7 14.334 7v5L83 74l-6 9.333-6.334 3-5.666-3-7-7.666-1.334-7.334V57.667Z'
      />
      <path
        fill='#6C6D84'
        d='M40.72 46.862c9.442 0 17.097-7.655 17.097-17.098 0-9.442-7.655-17.097-17.098-17.097-9.442 0-17.097 7.655-17.097 17.097.009 9.44 7.658 17.089 17.097 17.098Zm0-30.96c7.656 0 13.862 6.207 13.862 13.862 0 7.657-6.206 13.863-13.863 13.863-7.656 0-13.862-6.206-13.862-13.863.009-7.652 6.21-13.853 13.862-13.862Z'
      />
      <path
        fill='#040325'
        d='M85.153 56.42 71.21 48.997a1.576 1.576 0 0 0-1.537.016L56.91 56c-4.674-3.478-10.271-5.29-16.223-5.29-7.409.017-14.284 2.896-19.38 8.137-5.16 5.29-7.99 12.52-7.974 20.365a1.622 1.622 0 0 0 1.618 1.618l45-.081a20.904 20.904 0 0 0 7.926 6.05l1.877.825c.204.09.425.135.647.13.222-.005.441-.048.647-.13l2.12-.922a20.947 20.947 0 0 0 12.843-19.33V57.86c0-.6-.329-1.154-.858-1.44ZM16.617 77.58c.34-6.358 2.814-12.164 7.02-16.483 4.48-4.61 10.546-7.15 17.065-7.15h.049c5.355 0 10.37 1.682 14.526 4.869v8.75c.003 3.475.87 6.893 2.523 9.948l-41.183.066ZM82.776 67.37a17.715 17.715 0 0 1-10.887 16.355h-.016l-1.472.63-1.23-.534A17.776 17.776 0 0 1 58.512 67.55v-8.751l11.954-6.551 12.31 6.567v8.556Z'
      />
      <path
        fill='#040325'
        d='M66.034 66.515a1.618 1.618 0 0 0-2.459 2.103l3.672 4.286a1.629 1.629 0 0 0 2.248.21l8.541-6.938a1.621 1.621 0 0 0-2.054-2.508l-7.312 5.953-2.636-3.106Z'
      />
      <circle
        cx={40.667}
        cy={29.333}
        r={11.333}
        fill='#FFD9C3'
      />
    </svg>
  );
};