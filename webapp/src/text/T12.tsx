import {FC} from 'react';
import {CSSProperties} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  to?: string;
  hover?: boolean;
  numberOfLines?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const T12: FC<Props> = ({children, style = {}, numberOfLines = 0}) => {
  return (
    <p
      style={{
        fontSize: 12,
        lineHeight: 1.6,
        color: theme.colors.textColor,
        ...theme.fonts.SourceSansPro_400Regular,
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

export default T12;
