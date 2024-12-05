import React from 'react';

import {text} from '../text';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {theme} from '../constants';
import {TransactionType} from '../types';

type Props = {
  isLast?: boolean;
  onClick?: () => void;
  transaction: TransactionType;
};

export const Transaction: React.FC<Props> = ({
  transaction,
  isLast,
  onClick,
}) => {
  const navigate = hooks.useAppNavigate();

  return (
    <div
      style={{
        backgroundColor: '#FFF7F2',
        padding: 10,
        borderRadius: 10,
        cursor: 'pointer',
        marginBottom: isLast ? 0 : 6,
        ...utils.rowCenter(),
      }}
      onClick={() => {
        navigate('/TransactionDetails', {state: {transaction}});
      }}
    >
      <img
        alt='icon'
        src={transaction.icon}
        style={{width: 40, height: 40, marginRight: 14}}
      />
      <div style={{marginRight: 'auto'}}>
        <text.H6
          style={{
            textTransform: 'capitalize',
            color: theme.colors.mainDark,
            lineHeight: 1.2,
            marginBottom: 2,
          }}
        >
          {transaction.name}
        </text.H6>
        <div
          style={{
            fontSize: 12,
            lineHeight: 1.2,
            color: theme.colors.bodyTextColor,
            ...theme.fonts.SourceSansPro_400Regular,
          }}
        >
          {transaction.type}
        </div>
      </div>
      <div style={{...utils.rowCenter()}}>
        <text.H6
          style={{
            color:
              transaction.direction === 'in'
                ? '#55ACEE'
                : theme.colors.mainDark,
          }}
        >
          {transaction.direction === 'in' ? '+' : '-'}{' '}
          {transaction.amount.toFixed(2)}
        </text.H6>
      </div>
    </div>
  );
};
