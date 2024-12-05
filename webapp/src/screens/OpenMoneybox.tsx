import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

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

export const OpenMoneybox: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [amount, setAmount] = useState<
    'per day' | '$1 per transaction' | '$10 per transaction'
  >('per day');

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Open moneybox'
        goBack={true}
      />
    );
  };

  const renderAchieve = (): JSX.Element => {
    return (
      <div style={{marginTop: 10, marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>
          The amount you want to achieve
        </text.T14>
        <custom.InputField
          leftIcon={<svg.DollarSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='1 200 USD'
        />
        <custom.InputField
          leftIcon={<svg.EditSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='Enter your goal'
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
                backgroundColor: theme.colors.white,
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

  const renderAmountPerDay = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <div
          style={{
            marginBottom: 10,
            ...utils.rowCenter(),
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => setAmount('per day')}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              ...utils.flexCenter(),
              border: `1px solid ${theme.colors.bodyTextColor}`,
            }}
          >
            {amount === 'per day' && (
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#55ACEE',
                }}
              />
            )}
          </div>
          <text.T14 style={{marginLeft: 12}}>Amount per day</text.T14>
        </div>
        <custom.InputField
          placeholder='10.00'
          leftIcon={<svg.DollarSvg />}
          containerStyle={{marginBottom: 17}}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 17,
          }}
        >
          {/* Block 01 */}
          <div
            style={{
              flex: 1,
              border: '1px solid #FFEFE6',
              backgroundColor: theme.colors.white,
              borderRadius: 10,
              padding: 14,
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => setAmount('$1 per transaction')}
          >
            <div
              style={{
                width: 18,
                height: 18,
                border: `1px solid ${theme.colors.bodyTextColor}`,
                borderRadius: 9,
                marginBottom: 8,
                ...utils.flexCenter(),
              }}
            >
              {amount === '$1 per transaction' && (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#55ACEE',
                  }}
                />
              )}
            </div>
            <text.T16 numberOfLines={2}>
              Rounding up to $1 per transaction.
            </text.T16>
          </div>
          {/* Block 02 */}
          <div
            style={{
              border: '1px solid #FFEFE6',
              backgroundColor: theme.colors.white,
              borderRadius: 10,
              padding: 14,
              flex: 1,
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => setAmount('$10 per transaction')}
          >
            <div
              style={{
                width: 18,
                height: 18,
                border: `1px solid ${theme.colors.bodyTextColor}`,
                borderRadius: 9,
                marginBottom: 8,
                ...utils.flexCenter(),
              }}
            >
              {amount === '$10 per transaction' && (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#55ACEE',
                  }}
                />
              )}
            </div>
            <text.T16 numberOfLines={2}>
              Rounding up to $10 per transaction.
            </text.T16>
          </div>
        </div>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Open Moneybox'
        onClick={() => {
          navigate(-1);
        }}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{marginTop: 52, marginBottom: 60}}
      >
        {renderAchieve()}
        {renderUseCard()}
        {renderAmountPerDay()}
        {renderButton()}
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
