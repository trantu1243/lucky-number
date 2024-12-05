import React from 'react';
import {CSSProperties} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  onClick?: () => void;
  numberOfLines?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const T16: React.FC<Props> = ({
  onClick,
  children,
  style = {},
  numberOfLines = 0,
}) => {
  return (
    <p
      style={{
        fontSize: 16,
        lineHeight: 1.7,
        color: theme.colors.bodyTextColor,
        textAlign: 'left',
        ...theme.fonts.SourceSansPro_400Regular,
        ...(numberOfLines
          ? {
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: numberOfLines,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }
          : {}),
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default T16;
