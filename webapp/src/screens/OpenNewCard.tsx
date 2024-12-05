import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {theme} from '../constants';
import {components} from '../components';

const cards = [
  {
    id: 1,
    cardUrl: 'https://george-fx.github.io/apitex/cards/01.jpg',
  },
  {
    id: 2,
    cardUrl: 'https://george-fx.github.io/apitex/cards/02.jpg',
  },
];

export const OpenNewCard: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  const [currency, setCurrency] = useState<string>('usd');
  const [cardType, setCardType] = useState<string>('debet');
  const [paymentSystem, setPaymentSystem] = useState<string>('visa');

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Open new card'
        goBack={true}
      />
    );
  };

  const renderType = (): JSX.Element => {
    return (
      <div
        className='container'
        style={{marginBottom: 30}}
      >
        <text.T14 style={{marginBottom: 10, marginTop: 10}}>Type</text.T14>
        <div
          style={{
            ...utils.rowCenter({gap: 11}),
          }}
        >
          {['debet', 'credit'].map((title) => {
            return (
              <div
                key={title}
                style={{
                  borderRadius: 6,
                  flex: '1 1 calc(50% - 5.5px)',
                  height: 30,
                  ...utils.flexCenter(),
                  textAlign: 'center',
                  userSelect: 'none',
                  cursor: 'pointer',
                  border: `1px solid ${theme.colors.mainDark}`,
                  backgroundColor:
                    cardType === title
                      ? theme.colors.mainDark
                      : theme.colors.white,
                }}
                onClick={() => setCardType(title)}
              >
                <text.T14
                  style={{
                    textTransform: 'capitalize',
                    color:
                      cardType === title
                        ? theme.colors.white
                        : theme.colors.mainDark,
                  }}
                >
                  {title}
                </text.T14>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCurrency = (): JSX.Element => {
    return (
      <div
        className='container'
        style={{marginBottom: 30}}
      >
        <text.T14 style={{marginBottom: 10}}>Choose currency</text.T14>
        <div style={{...utils.rowCenter({gap: 11})}}>
          {['usd', 'eur'].map((title) => {
            return (
              <div
                key={title}
                style={{
                  borderRadius: 6,
                  flex: '1 1 calc(50% - 5.5px)',
                  height: 30,
                  userSelect: 'none',
                  cursor: 'pointer',
                  border: `1px solid ${theme.colors.mainDark}`,
                  backgroundColor:
                    currency === title
                      ? theme.colors.mainDark
                      : theme.colors.white,
                  ...utils.flexCenter(),
                }}
                onClick={() => setCurrency(title)}
              >
                <text.T14
                  style={{
                    textTransform: 'uppercase',
                    color:
                      currency === title
                        ? theme.colors.white
                        : theme.colors.mainDark,
                  }}
                >
                  {title}
                </text.T14>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPaymentSystem = (): JSX.Element => {
    return (
      <div
        className='container'
        style={{marginBottom: 30}}
      >
        <text.T14 style={{marginBottom: 10}}>Payment system</text.T14>
        <div style={{...utils.rowCenter({gap: 11})}}>
          {['VISA', 'MASTERCARD'].map((title) => {
            return (
              <div
                key={title}
                style={{
                  borderRadius: 6,
                  flex: '1 1 calc(50% - 5.5px)',
                  height: 30,
                  textAlign: 'center',
                  userSelect: 'none',
                  cursor: 'pointer',
                  border: `1px solid ${theme.colors.mainDark}`,
                  backgroundColor:
                    paymentSystem === title
                      ? theme.colors.mainDark
                      : theme.colors.white,
                  ...utils.flexCenter(),
                }}
                onClick={() => setPaymentSystem(title)}
              >
                <text.T14
                  style={{
                    color:
                      paymentSystem === title
                        ? theme.colors.white
                        : theme.colors.mainDark,
                  }}
                >
                  {title}
                </text.T14>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCards = (): JSX.Element => {
    return (
      <div style={{marginBottom: 20}}>
        <custom.ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          {cards.map((item, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <div
                style={{
                  width: 310,
                  display: 'flex',
                  marginRight: isLast ? 0 : 16,
                }}
              >
                <img
                  src={item.cardUrl}
                  alt='card'
                  style={{width: 310, height: 190, borderRadius: 14}}
                />
              </div>
            );
          })}
        </custom.ScrollView>
      </div>
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <div
        className='container'
        style={{marginBottom: 30}}
      >
        <text.T16>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </text.T16>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Add new card'
        onClick={() => {
          navigate(-1);
        }}
        containerStyle={{margin: '0 20px'}}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{marginTop: 52, marginBottom: 40}}>
        {renderType()}
        {renderCurrency()}
        {renderPaymentSystem()}
        {renderCards()}
        {renderDescription()}
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
