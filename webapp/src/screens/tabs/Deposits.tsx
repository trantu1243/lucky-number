import React from 'react';

import {text} from '../../text';
import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';

const deposits = [
  {
    id: 1,
    title: 'Withdrawal →',
    amount: '1 712.78',
    date: 'Jan 1 - Apr 1, 2023',
    icon: <svg.DepositCheckSvg />,
  },
  {
    id: 2,
    title: 'Top - up  →',
    amount: '3 648.37',
    date: 'JFeb 1 - May 1, 2023',
    icon: <svg.DepositPercentSvg />,
  },
];

const moneyboxes = [
  {
    id: 1,
    goal: '1 200 USD',
    amount: '650.37',
    item: 'New iPhone Pro Max',
    icon: <svg.PiggyBankSvg />,
  },
];

export const Deposits: React.FC = () => {
  const navigate = hooks.useAppNavigate();

  const renderHeader = (): JSX.Element => {
    return <components.Header />;
  };

  const renderTitle = (): JSX.Element => {
    return (
      <div style={{marginBottom: 20}}>
        <text.H2>Deposits</text.H2>
      </div>
    );
  };

  const renderCurrentDeposits = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T16 style={{marginBottom: 10}}>Current deposits</text.T16>
        {deposits.map((deposit, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              style={{
                width: '100%',
                backgroundColor: '#FFF7F2',
                borderRadius: 10,
                padding: '20px 18px',
                cursor: 'pointer',
                userSelect: 'none',
                marginBottom: isLast ? 0 : 6,
                ...utils.rowCenter(),
              }}
            >
              {deposit.icon}
              <div style={{marginLeft: 12, marginRight: 'auto'}}>
                <div style={{fontSize: 20, marginBottom: 1}}>
                  {deposit.amount}{' '}
                  <span
                    style={{
                      ...theme.fonts.SourceSansPro_400Regular,
                      fontSize: 14,
                      textTransform: 'uppercase',
                      color: theme.colors.mainDark,
                    }}
                  >
                    usd
                  </span>
                </div>
                <text.T14>{deposit.date}</text.T14>
              </div>
              <text.T14
                style={{
                  ...theme.fonts.SourceSansPro_600SemiBold,
                  color: theme.colors.mainColor,
                }}
              >
                {deposit.title}
              </text.T14>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCurrentMoneyBoxes = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T16 style={{marginBottom: 10}}>Current deposits</text.T16>
        {moneyboxes.map((deposit, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              style={{
                width: '100%',
                backgroundColor: '#FFF7F2',
                borderRadius: 10,
                padding: '20px 18px',
                cursor: 'pointer',
                userSelect: 'none',
                marginBottom: isLast ? 0 : 6,
                ...utils.rowCenter(),
              }}
            >
              {deposit.icon}
              <div style={{marginLeft: 12, marginRight: 'auto'}}>
                <div style={{fontSize: 20, marginBottom: 1}}>
                  {deposit.amount}{' '}
                  <span
                    style={{
                      ...theme.fonts.SourceSansPro_400Regular,
                      fontSize: 14,
                      textTransform: 'uppercase',
                      color: theme.colors.mainDark,
                    }}
                  >
                    usd
                  </span>
                </div>
                <text.T14>{deposit.item}</text.T14>
              </div>
              <text.T14
                style={{
                  color: theme.colors.bodyTextColor,
                }}
              >
                Goal: {deposit.goal}
              </text.T14>
            </div>
          );
        })}
      </div>
    );
  };

  const renderButtons = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <components.Button
          title='+ moneybox'
          colorScheme='light'
          containerStyle={{width: '48%'}}
          onClick={() => navigate('/OpenMoneybox')}
        />
        <components.Button
          title='+ Deposit'
          containerStyle={{width: '48%'}}
          onClick={() => navigate('/OpenDeposit')}
        />
      </div>
    );
  };

  const renderBottomTabBar = () => {
    return <components.BottomTabBar />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52, paddingBottom: 90}}
        className='container'
      >
        {renderTitle()}
        {renderCurrentDeposits()}
        {renderCurrentMoneyBoxes()}
        {renderButtons()}
      </main>
    );
  };

  return (
    <div id='screen'>
      {renderHeader()}
      {renderContent()}
      {renderBottomTabBar()}
    </div>
  );
};
