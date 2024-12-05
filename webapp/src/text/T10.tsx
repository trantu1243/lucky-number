import React from 'react';
import {CSSProperties} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  to?: string;
  numberOfLines?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const T10: React.FC<Props> = ({children, style = {}, numberOfLines = 0}) => {
  return (
    <p
      style={{
        fontSize: 10,
        ...theme.fonts.SourceSansPro_400Regular,
        lineHeight: 1.6,
        ...(numberOfLines
          ? (utils.numberOfLines(numberOfLines) as CSSProperties)
          : {}),
        ...style,
      }}
    >
      {children}
    </p>
  );
};

export default T10;
