import React from 'react';

type Props = {
  color?: string;
};

export const MoreTabSvg: React.FC<Props> = ({color = '#FF8A71'}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={50}
      height={24}
      fill='none'
    >
      <path
        fill={color}
        d='M25 21.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM25 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM25 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'
      />
    </svg>
  );
};
