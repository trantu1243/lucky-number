import {useLocation} from 'react-router-dom';
import React, {useState, useEffect} from 'react';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

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

export const FundTransfer: React.FC = () => {
  const {pathname} = useLocation();
  const location = useLocation();
  const navigate = hooks.useAppNavigate();

  const {user} = location.state || {
    user: {
      name: 'Jazmine Goodwin',
      photo: 'https://george-fx.github.io/apitex_api/assets/users/02.png',
    },
  };

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const [selectedCard, setSelectedCard] = useState<number>(cards[0].id);

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Fund transfer'
        goBack={true}
      />
    );
  };

  const renderSendMoneyTo = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>Send money to</text.T14>
        <div style={{...utils.rowCenter()}}>
          <img
            alt='card'
            src={user.photo}
            style={{width: 30, height: 30, borderRadius: 15}}
          />
          <text.H5 style={{marginLeft: 14, marginRight: 'auto'}}>
            {user.name}
          </text.H5>
          <text.T14>**** 1258</text.T14>
        </div>
      </div>
    );
  };

  const renderUserCard = (): JSX.Element => {
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
                backgroundColor: theme.colors.white,
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
        <custom.InputField
          leftIcon={<svg.DollarSvg />}
          containerStyle={{marginTop: 10, marginBottom: 10}}
          placeholder='Amount'
        />
        <div
          style={{
            width: '100%',
            padding: 14,
            backgroundColor: theme.colors.white,
            border: '1px solid #FFEFE6',
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <textarea
            placeholder='Comment'
            style={{
              width: '100%',
              height: 120,
              ...theme.fonts.SourceSansPro_400Regular,
            }}
          />
        </div>
        <text.T14>Bank fee: 0.20 USD</text.T14>
        <components.Button
          title='Send'
          containerStyle={{marginTop: 20}}
          onClick={() => navigate('/PaymentSuccess')}
        />
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52 + 10, marginBottom: 20}}
        className='container'
      >
        {renderSendMoneyTo()}
        {renderUserCard()}
      </main>
    );
  };

  return (
    <div id='screen'>
      {renderBackground()}
      {renderHeader()}
      {renderContent()}
    </div>
  );
};
