import React from 'react';

import {text} from '../text';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';

type Props = {
  title: string;
  viewAllVisible?: boolean;
  rightIcon?: React.ReactNode;
  viewAllOnClick?: () => void;
  rightIconOnClick?: () => void;
  containerStyle?: React.CSSProperties;
};

export const BlockHeading: React.FC<Props> = ({
  title,
  rightIcon,
  viewAllOnClick,
  containerStyle,
  rightIconOnClick,
  viewAllVisible = true,
}) => {
  return (
    <div style={{...utils.rowCenterSpcBtw(), ...containerStyle}}>
      <text.H5>{title}</text.H5>
      {rightIcon && <button onClick={rightIconOnClick}>{rightIcon}</button>}
    </div>
  );
};
