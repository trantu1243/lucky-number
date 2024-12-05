import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const transactions = [
  {
    id: 1,
    title: 'Money transfer',
    amount: '7923.52',
    quantity: 36,
    icon: <svg.StatisticExchangeSvg />,
    percent: 68,
  },
  {
    id: 2,
    title: 'Food products',
    amount: '1398.27',
    quantity: 18,
    icon: <svg.ShoppingCartSvg />,
    percent: 12,
  },
  {
    id: 3,
    title: 'Utility bills',
    amount: '466.09',
    quantity: 6,
    icon: <svg.ElectricitySvg />,
    percent: 8,
  },
  {
    id: 4,
    title: 'Cafe and restaurants',
    amount: '332.18',
    quantity: 4,
    icon: <svg.CoffeeSvg />,
    percent: 6,
  },
  {
    id: 5,
    title: 'Medical supplies',
    amount: '76.09',
    quantity: 2,
    icon: <svg.StatisticPlusSvg />,
    percent: 4,
  },
];

export const Statistics: React.FC = () => {
  const {pathname} = useLocation();

  const [category, setCategory] = useState('expenses');

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Statistics'
        goBack={true}
      />
    );
  };

  const renderCategory = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#FFF6F2',
          borderRadius: 10,
          padding: 2,
          gap: 10,
          marginBottom: 30,
        }}
      >
        {['income', 'expenses'].map((item, index) => {
          return (
            <div
              style={{
                flex: '1 1 50%',
                backgroundColor:
                  category === item ? theme.colors.mainDark : '#FFF6F2',
                borderRadius: 5,
                ...utils.flexCenter(),
                lineHeight: 1.6,
                paddingBottom: 5,
                paddingTop: 3,
                fontSize: 14,
                cursor: 'pointer',
                userSelect: 'none',
                textTransform: 'capitalize',
                color: category === item ? '#FFF' : theme.colors.mainDark,
              }}
              onClick={() => setCategory(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDate = (): JSX.Element => {
    return (
      <div style={{...utils.rowCenter({gap: 10}), marginBottom: 14}}>
        <text.T14 style={{marginTop: 2}}>Sep 1 - Sep 20, 2022</text.T14>
        <svg.CalendarStatisticSvg />
      </div>
    );
  };

  const renderCard = (): JSX.Element => {
    return (
      <div
        style={{
          border: '1px solid #FFEFE6',
          padding: '12px 20px 12px 12px',
          borderRadius: 10,
          cursor: 'pointer',
          userSelect: 'none',
          marginBottom: 30,
          ...utils.rowCenter(),
        }}
      >
        <img
          src={'https://george-fx.github.io/apitex_api/assets/cards/01.png'}
          alt='card'
          style={{height: 42, width: 62, borderRadius: 6}}
        />
        <div style={{marginLeft: 12, marginRight: 'auto'}}>
          <span style={{fontSize: 12, color: theme.colors.bodyTextColor}}>
            **** **** **** 7895
          </span>
          <text.H6>4 863.27 USD</text.H6>
        </div>
        <svg.MoreVerticalSvg />
      </div>
    );
  };

  const renderChart = (): JSX.Element => {
    return (
      <div
        style={{
          padding: 20,
          border: '1px solid #FFEFE6',
          borderRadius: 14,
          marginBottom: 30,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '76%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 10,
          }}
        >
          <div
            style={{
              height: 126,
              flex: '1 1 20%',
              backgroundColor: theme.colors.mainDark,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              height: 95,
              flex: '1 1 20%',
              backgroundColor: '#4F4F66',
              borderRadius: 3,
            }}
          />
          <div
            style={{
              height: 51,
              flex: '1 1 20%',
              backgroundColor: '#818192',
              borderRadius: 3,
            }}
          />
          <div
            style={{
              height: 37,
              flex: '1 1 20%',
              backgroundColor: '#B4B3BE',
              borderRadius: 3,
            }}
          />
          <div
            style={{
              height: 8,
              flex: '1 1 20%',
              backgroundColor: '#CDCDD3',
              borderRadius: 3,
            }}
          />
        </div>
        <text.T16
          style={{
            right: 20,
            bottom: 12,
            color: theme.colors.mainDark,
            position: 'absolute',
          }}
        >
          USD
        </text.T16>
        <div style={{position: 'absolute', top: 20, right: 20}}>
          <span
            style={{
              ...theme.fonts.SourceSansPro_400Regular,
              fontSize: 32,
              color: theme.colors.mainDark,
            }}
          >
            - 11 654
          </span>
          <span
            style={{
              fontSize: 20,
              ...theme.fonts.SourceSansPro_400Regular,
              color: theme.colors.mainDark,
            }}
          >
            .24
          </span>
        </div>
      </div>
    );
  };

  const renderTransactions = (): JSX.Element => {
    return (
      <div>
        {transactions.map((item, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: isLast ? 0 : 6,
                backgroundColor: '#FFF7F2',
                borderRadius: 10,
                padding: 10,
              }}
            >
              {item.icon}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 14,
                  marginRight: 'auto',
                }}
              >
                <text.H6>{item.title}</text.H6>
                <span style={{fontSize: 12, color: theme.colors.bodyTextColor}}>
                  {item.quantity}{' '}
                  {item.quantity > 1 ? 'transactions' : 'transaction'}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <text.H6>- {item.amount}</text.H6>
                <span
                  style={{
                    fontSize: 12,
                    color: theme.colors.bodyTextColor,
                  }}
                >
                  {item.percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52 + 10, marginBottom: 80}}
        className='container'
      >
        {renderCategory()}
        {renderDate()}
        {renderCard()}
        {renderChart()}
        {renderTransactions()}
      </main>
    );
  };

  return (
    <div id='screen'>
      {renderHeader()}
      {renderContent()}
    </div>
  );
};
