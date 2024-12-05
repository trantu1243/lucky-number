import React from 'react';

import {text} from '../../text';
import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {custom} from '../../custom';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';

const loanDetails = [
  {
    id: 1,
    title: 'Rate',
    description: '13%',
  },
  {
    id: 2,
    title: 'Period',
    description: '24 months',
  },
  {
    id: 3,
    title: 'Monthly payment',
    description: '1 117.00 USD',
  },
  {
    id: 4,
    title: 'Total paid',
    description: '4 468.00 USD',
  },
];

export const Loans: React.FC = () => {
  const navigate = hooks.useAppNavigate();

  const renderHeader = (): JSX.Element => {
    return <components.Header />;
  };

  const renderBottomTabBar = () => {
    return <components.BottomTabBar />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{marginTop: 52, paddingBottom: 90}}
      >
        <text.H2 style={{marginBottom: 20}}>Loans</text.H2>
        <text.T16 style={{marginBottom: 12}}>Current loans</text.T16>
        <div
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#FFF7F2',
            cursor: 'pointer',
            userSelect: 'none',
            marginBottom: 20,
            ...utils.rowCenter(),
          }}
        >
          <svg.PercentageSvg />
          <div style={{marginLeft: 8, marginRight: 'auto'}}>
            <span
              style={{
                ...theme.fonts.SourceSansPro_400Regular,
                fontSize: 20,
                color: theme.colors.mainDark,
              }}
            >
              - 20 532
            </span>
            <span
              style={{
                ...theme.fonts.SourceSansPro_400Regular,
                fontSize: 14,
                color: theme.colors.mainDark,
              }}
            >
              .00 USD
            </span>
          </div>
          <div
            style={{
              ...theme.fonts.SourceSansPro_600SemiBold,
              fontSize: 14,
              color: theme.colors.mainColor,
            }}
          >
            Repay →
          </div>
        </div>
        <div style={{marginBottom: 30}}>
          {loanDetails.map((item, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <div
                style={{
                  ...utils.rowCenterSpcBtw(),
                  padding: '0 20px',
                  marginBottom: isLast ? 0 : 14,
                }}
              >
                <text.T14 style={{marginBottom: 10}}>{item.title}</text.T14>
                <text.H6>{item.description}</text.H6>
              </div>
            );
          })}
        </div>
        <components.Button
          title='+ new Loan'
          colorScheme='light'
          onClick={() => navigate('/OpenNewLoan')}
        />
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
