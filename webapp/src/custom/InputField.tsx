import React, {FC} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  type?: 'text' | 'password' | 'number';
  clickable?: boolean;
  containerStyle?: React.CSSProperties;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  inputMode?: 'none' | 'numeric';
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: FC<Props> = ({
  placeholder,
  containerStyle,
  autoCapitalize = 'none',
  leftIcon,
  rightIcon,
  clickable,
  type = 'text',
  inputMode = 'none',
  name,
  value,
  onChange
}) => {
  return (
    <div
      style={{
        height: 50,
        paddingLeft: 10,
        paddingRight: 20,
        position: 'relative',
        border: '1px solid #FFEFE6',
        backgroundColor: theme.colors.main2Dark,
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
        name={name}
        value={value}
        inputMode={inputMode}
        onChange={onChange}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
          border: 'none',
          outline: 'none',
          backgroundColor: theme.colors.main2Dark,
          fontSize: 16,
          color: theme.colors.whiteText,
          ...theme.fonts.SourceSansPro_400Regular,
        }}
      />
      {rightIcon && !clickable && <div>{rightIcon}</div>}
      {rightIcon && clickable && <button>{rightIcon}</button>}
    </div>
  );
};
