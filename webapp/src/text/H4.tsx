import {FC} from 'react';
import {CSSProperties} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  to?: string;
  hover?: boolean;
  style?: CSSProperties;
  numberOfLines?: number;
  children: React.ReactNode;
  containerStyle?: CSSProperties;
};

const H4: FC<Props> = ({
  style,
  children,
  numberOfLines = 0,
}): JSX.Element | null => {
  return (
    <h4
      style={{
        fontSize: 18,
        lineHeight: 1.2,
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
    </h4>
  );
};

export default H4;
