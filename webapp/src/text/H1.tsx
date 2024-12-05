import React from 'react';
import {CSSProperties} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  style?: CSSProperties;
  numberOfLines?: number;
  children: React.ReactNode;
};

const H1: React.FC<Props> = ({
  style,
  children,
  numberOfLines = 0,
}): JSX.Element => {
  return (
    <h1
      style={{
        fontSize: 32,
        lineHeight: 1.2,
        color: theme.colors.mainDark,
        textAlign: 'left',
        ...theme.fonts.SourceSansPro_600SemiBold,
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
    >
      {children}
    </h1>
  );
};

export default H1;
