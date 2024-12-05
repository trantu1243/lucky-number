import React from 'react';

type Props = {
  color?: string;
};

export const DepositTabSvg: React.FC<Props> = ({color = '#FF8A71'}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={50}
      height={24}
      fill='none'
    >
      <path
        fill={color}
        d='M20.191 13.618A4.193 4.193 0 0 0 16 17.808 4.193 4.193 0 0 0 20.191 22a4.193 4.193 0 0 0 4.191-4.191 4.193 4.193 0 0 0-4.19-4.191Zm2.068 3.464-2.236 2.236a.524.524 0 0 1-.39.167.525.525 0 0 1-.392-.167L18.124 18.2a.54.54 0 0 1 0-.782.54.54 0 0 1 .782 0l.726.715 1.845-1.833a.54.54 0 0 1 .782 0 .54.54 0 0 1 0 .782Z'
      />
      <path
        fill={color}
        d='M34.508 6.845a1.694 1.694 0 0 0-1.184-.492H17.677c-.436 0-.872.179-1.185.492A1.675 1.675 0 0 0 16 8.029v6.561c.972-1.263 2.481-2.09 4.191-2.09a5.314 5.314 0 0 1 5.309 5.309c0 .693-.145 1.352-.38 1.956h8.204c.435 0 .871-.18 1.184-.492.313-.313.492-.749.492-1.185V8.03c0-.447-.179-.871-.492-1.184Zm-4.537 8.45a2.795 2.795 0 0 1 0-5.59 2.795 2.795 0 0 1 0 5.59ZM32.027 4.676v.56h-14.35a2.81 2.81 0 0 0-1.677.57v-1.13C16 3.75 16.749 3 17.677 3H30.35c.927 0 1.676.749 1.676 1.676Z'
      />
      <path
        fill={color}
        d='M29.97 14.177a1.677 1.677 0 1 0 0-3.354 1.677 1.677 0 0 0 0 3.354Z'
      />
    </svg>
  );
};
