import React from 'react';

import {hooks} from '../hooks';
import {utils} from '../utils';
import {theme} from '../constants';
import {OperationType} from '../types';

type Props = {
  isLast?: boolean;
  operation: OperationType;
};

export const Operation: React.FC<Props> = ({isLast, operation}) => {
  const navigate = hooks.useAppNavigate();
  return (
    <div
      style={{
        minWidth: 125,
        padding: '8px 11px',
        borderRadius: 10,
        whiteSpace: 'pre-line',
        color: '#B4B4C6',
        marginRight: isLast ? 0 : 16,
        ...utils.rowCenter(),
        gap: 10,
        cursor: 'pointer',
        backgroundColor: theme.colors.main2Dark,
      }}
      onClick={() => {
        navigate(operation.url);
      }}
    >
      <div>{operation.icon}</div>
      <span
        style={{
          fontSize: 10,
          ...theme.fonts.SourceSansPro_600SemiBold,
          lineHeight: 1.2,
        }}
      >
        {operation.title}
      </span>
    </div>
  );
};
