import React from 'react';
import {CSSProperties} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  to?: string;
  hover?: boolean;
  style?: CSSProperties;
  numberOfLines?: number;
  children: React.ReactNode;
};

const H5: React.FC<Props> = ({
  style,
  children,
  numberOfLines = 0,
}): JSX.Element | null => {
  return (
    <h5
      style={{
        fontSize: 16,
        lineHeight: 1.3,
        color: theme.colors.mainDark,
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
    >
      {children}
    </h5>
  );
};

export default H5;
