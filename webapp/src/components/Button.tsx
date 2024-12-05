import React from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

interface ButtonProps {
  title: string;
  onClick?: () => void;
  colorScheme?: 'dark' | 'light';
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  style,
  onClick,
  colorScheme = 'dark',
  containerStyle,
}) => {
  return (
    <div style={{...containerStyle}}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          color:
            colorScheme === 'dark' ? theme.colors.white : theme.colors.mainDark,
          height: 40,
          textAlign: 'center',
          fontSize: 16,
          borderRadius: 10,
          textTransform: 'capitalize',
          border: colorScheme === 'dark' ? 'none' : '1px solid #FFD9C3',
          background:
            colorScheme === 'dark' ? theme.colors.mainDark : '#FFD9C3',
          ...utils.flexCenter(),
          ...theme.fonts.SourceSansPro_600SemiBold,
          ...style,
        }}
      >
        {title}
      </button>
    </div>
  );
};
