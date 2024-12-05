import React, {FC} from 'react';

import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';

type Props = {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  type?: 'text' | 'password';
  clickable?: boolean;
  containerStyle?: React.CSSProperties;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  placeholder?: string;
};

export const InputField: FC<Props> = ({
  placeholder,
  containerStyle,
  autoCapitalize = 'none',
  leftIcon,
  rightIcon,
  clickable,
  type = 'text',
}) => {
  return (
    <div
      style={{
        height: 50,
        paddingLeft: 10,
        paddingRight: 20,
        position: 'relative',
        border: '1px solid #FFEFE6',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        ...utils.rowCenter(),
        ...containerStyle,
      }}
    >
      <div style={{marginRight: 14}}>{leftIcon}</div>
      <input
        className='input-field'
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        maxLength={50}
        type={type}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          fontSize: 16,
          color: theme.colors.mainDark,
          ...theme.fonts.SourceSansPro_400Regular,
        }}
      />
      {rightIcon && !clickable && <div>{rightIcon}</div>}
      {rightIcon && clickable && <button>{rightIcon}</button>}
    </div>
  );
};
