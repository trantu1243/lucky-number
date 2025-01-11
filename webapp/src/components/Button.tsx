import React from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

interface ButtonProps {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  colorScheme?: 'dark' | 'light';
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  style,
  onClick,
  colorScheme = 'dark',
  containerStyle,
  disabled = false
}) => {
  return (
    <div style={{...containerStyle}}>
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          width: '100%',
          color: '#fff',
          height: 40,
          textAlign: 'center',
          fontSize: 16,
          borderRadius: 10,
          textTransform: 'capitalize',
          border: colorScheme === 'dark' ? 'none' : '1px solid #FFD9C3',
          background:
            colorScheme === 'dark' ? (disabled ? "#e16d66" : theme.colors.mainColor) : theme.colors.primary,
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
