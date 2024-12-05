import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const currencies = [
  {
    id: 1,
    title: 'USD',
  },
  {
    id: 2,
    title: 'EUR',
  },
];

const periods = [
  {
    id: 1,
    title: '3 mos',
  },
  {
    id: 2,
    title: '12 mos',
  },
  {
    id: 3,
    title: '24 mos',
  },
  {
    id: 4,
    title: '6 mos',
  },
  {
    id: 5,
    title: '18 mos',
  },
  {
    id: 6,
    title: '36 mos',
  },
];

const cards = [
  {
    id: 1,
    cardUrl: 'https://george-fx.github.io/apitex_api/assets/cards/01.png',
    number: '**** **** **** 7895',
    balance: '4 863.27',
  },
  {
    id: 2,
    cardUrl: 'https://george-fx.github.io/apitex_api/assets/cards/02.png',
    number: '**** **** **** 5378',
    balance: '2 435.12',
  },
];

export const OpenDeposit: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[2].title,
  );
  const [selectedCard, setSelectedCard] = useState<number>(cards[0].id);
  const [earlyWithdrawal, setEarlyWithdrawal] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Open deposit'
        goBack={true}
      />
    );
  };

  const renderChooseCurrency = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30, marginTop: 10}}>
        <text.T14 style={{marginBottom: 10}}>Choose currency</text.T14>
        <div style={{...utils.rowCenterSpcBtw()}}>
          {currencies.map((currency, index, array) => {
            return (
              <components.Button
                key={currency.id}
                title={currency.title}
                containerStyle={{width: '48%'}}
                style={{
                  height: 30,
                  fontSize: 14,
                  borderRadius: 6,
                  backgroundColor:
                    selectedCurrency === currency.title
                      ? theme.colors.mainDark
                      : theme.colors.white,
                  border: `1px solid ${theme.colors.mainDark}`,
                  color:
                    selectedCurrency === currency.title
                      ? theme.colors.white
                      : theme.colors.mainDark,
                }}
                onClick={() => setSelectedCurrency(currency.title)}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderChooseDepositPeriod = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>Choose deposit period</text.T14>
        <div style={{display: 'flex', gap: 10}}>
          {/* Block 01 */}
          <div
            style={{
              flex: '1 1 calc(33.333% - 10px)',
              backgroundColor: '#FFF7F2',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              aspectRatio: '1/1',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                ...theme.fonts.SourceSansPro_400Regular,
                fontSize: 12,
                textTransform: 'capitalize',
                color: theme.colors.mainColor,
                marginBottom: 8,
                marginTop: 10,
              }}
            >
              You rate
            </span>
            <span
              style={{
                ...theme.fonts.SourceSansPro_400Regular,
                fontSize: 24,
                textTransform: 'capitalize',
                color: theme.colors.mainColor,
                marginBottom: 8,
              }}
            >
              8 %
            </span>
          </div>
          {/* Block 02 */}
          <div
            style={{
              flex: '1 1 calc(33.333% - 10px)',
              aspectRatio: '1/1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            {periods.slice(0, 3).map((period, index, array) => {
              return (
                <div
                  key={period.id}
                  title={period.title}
                  style={{
                    flex: '1 1 calc(33.333% - 10px)',
                    width: '100%',
                    border: `1px solid ${theme.colors.mainDark}`,
                    borderRadius: 6,
                    display: 'flex',
                    userSelect: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor:
                      selectedPeriod === period.title
                        ? theme.colors.mainDark
                        : theme.colors.white,
                  }}
                  onClick={() => setSelectedPeriod(period.title)}
                >
                  <text.T14
                    style={{
                      color:
                        selectedPeriod === period.title
                          ? theme.colors.white
                          : theme.colors.mainDark,
                    }}
                  >
                    {period.title}
                  </text.T14>
                </div>
              );
            })}
          </div>
          {/* Block 03 */}
          <div
            style={{
              flex: '1 1 calc(33.333% - 10px)',
              aspectRatio: '1/1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            {periods.slice(3, 6).map((period, index, array) => {
              return (
                <div
                  key={period.id}
                  title={period.title}
                  style={{
                    flex: '1 1 calc(33.333% - 10px)',
                    width: '100%',
                    border: `1px solid ${theme.colors.mainDark}`,
                    borderRadius: 6,
                    display: 'flex',
                    userSelect: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor:
                      selectedPeriod === period.title
                        ? theme.colors.mainDark
                        : theme.colors.white,
                  }}
                  onClick={() => setSelectedPeriod(period.title)}
                >
                  <text.T14
                    style={{
                      color:
                        selectedPeriod === period.title
                          ? theme.colors.white
                          : theme.colors.mainDark,
                    }}
                  >
                    {period.title}
                  </text.T14>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderAmount = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>Amount</text.T14>
        <custom.InputField
          placeholder='1 000.00'
          leftIcon={<svg.DollarSvg />}
        />
      </div>
    );
  };

  const renderUseCard = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>Use card</text.T14>
        {cards.map((card, index, array) => {
          const isLast = index === array.length - 1;

          return (
            <div
              style={{
                border:
                  selectedCard === card.id
                    ? `1px solid ${theme.colors.mainColor}`
                    : '1px solid #FFEFE6',
                padding: 12,
                borderRadius: 10,
                cursor: 'pointer',
                userSelect: 'none',
                marginBottom: isLast ? 0 : 10,
                ...utils.rowCenter({gap: 12}),
              }}
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
            >
              <img
                src={card.cardUrl}
                alt='card'
                style={{
                  width: 62,
                  height: 42,
                  borderRadius: 6,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: theme.colors.bodyTextColor,
                    ...theme.fonts.SourceSansPro_400Regular,
                  }}
                >
                  {card.number}
                </div>
                <text.H6>{card.balance}</text.H6>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDepositWithdrawal = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30, ...utils.rowCenterSpcBtw()}}>
        <text.H6>Early deposit withdrawal</text.H6>
        <div
          style={{
            width: 41,
            backgroundColor: earlyWithdrawal ? '#55ACEE' : 'lightgray',
            borderRadius: 12,
            padding: '1.5px 1.5px',
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: earlyWithdrawal ? 'flex-end' : 'flex-start',
          }}
          onClick={() => setEarlyWithdrawal(!earlyWithdrawal)}
        >
          <div
            style={{
              width: 20.9,
              height: 20.9,
              backgroundColor: '#FFFFFF',
              borderRadius: 11,
              alignSelf: earlyWithdrawal ? 'flex-end' : 'flex-start',
            }}
          />
        </div>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Open deposit'
        onClick={() => navigate(-1)}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52, marginBottom: 60}}
        className='container'
      >
        {renderChooseCurrency()}
        {renderChooseDepositPeriod()}
        {renderAmount()}
        {renderUseCard()}
        {renderDepositWithdrawal()}
        {renderButton()}
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
