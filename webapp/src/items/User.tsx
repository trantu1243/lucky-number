import React from 'react';
import {theme} from '../constants';

import {hooks} from '../hooks';
import {UserType} from '../types';

type Props = {
  user: UserType;
  isLast?: boolean;
};

export const User: React.FC<Props> = ({user, isLast}) => {
  const navigate = hooks.useAppNavigate();

  return (
    <div
      style={{
        marginRight: 4,
        display: 'flex',
        maxWidth: 55,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => {
        navigate('/FundTransfer', {state: {user}});
      }}
    >
      <img
        src={user.photo}
        style={{
          width: 40,
          marginBottom: 4,
          borderRadius: 20,
        }}
      />
      <span
        style={{
          fontSize: 12,
          textAlign: 'center',
          color: theme.colors.bodyTextColor,
          ...theme.fonts.SourceSansPro_400Regular,
        }}
      >
        {user.name}
      </span>
    </div>
  );
};
