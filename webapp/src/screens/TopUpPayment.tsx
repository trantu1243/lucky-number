import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const methods = [
  {
    id: 1,
    title: 'Card from another bank',
    icon: <svg.TopUpCreditCardSvg />,
  },
  {
    id: 2,
    title: 'SEPA',
    icon: <svg.SepaSvg />,
  },
  {
    id: 3,
    title: 'Western Union',
    icon: <svg.WJSvg />,
  },
  {
    id: 4,
    title: 'Paypal',
    icon: <svg.PayPalSvg />,
  },
  {
    id: 5,
    title: 'Payoneer',
    icon: <svg.PayoneerSvg />,
  },
];

export const TopUpPayment: React.FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        goBack={true}
        title='Top-Up payment'
      />
    );
  };

  const renderCards = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>Cards</text.T14>
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            backgroundColor: '#FFF7F2',
            ...utils.rowCenter({gap: 12}),
          }}
        >
          <img
            src='https://george-fx.github.io/apitex_api/assets/cards/02.png'
            alt='card'
            style={{width: 62}}
          />
          <div>
            <div
              style={{
                fontSize: 12,
                ...theme.fonts.SourceSansPro_400Regular,
                color: theme.colors.bodyTextColor,
                lineHeight: 1.6,
              }}
            >
              **** **** **** 8456
            </div>
            <text.H6>2 156.35 EUR</text.H6>
          </div>
        </div>
      </div>
    );
  };

  const renderEntrepreneurAccounts = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>Entrepreneur accounts</text.T14>
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            backgroundColor: '#FFF7F2',
            ...utils.rowCenter({gap: 12}),
          }}
        >
          <img
            src={require('../assets/other/05.png')}
            alt='card'
            style={{width: 62}}
          />
          <div>
            <div
              style={{
                fontSize: 12,
                ...theme.fonts.SourceSansPro_400Regular,
                color: theme.colors.bodyTextColor,
                lineHeight: 1.6,
              }}
            >
              US**********************4571
            </div>
            <text.H6>39 863.62 USD</text.H6>
          </div>
        </div>
      </div>
    );
  };

  const renderOtherMethods = (): JSX.Element => {
    return (
      <div>
        <text.T14 style={{marginBottom: 10}}>Other methods</text.T14>
        {methods.map((method, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              key={method.id}
              style={{
                borderRadius: 10,
                cursor: 'pointer',
                userSelect: 'none',
                marginBottom: isLast ? 0 : 10,
                ...utils.rowCenter(),
              }}
              onClick={() => {}}
            >
              <div>{method.icon}</div>
              <text.H6 style={{marginLeft: 14, marginRight: 'auto'}}>
                {method.title}
              </text.H6>
              <svg.InfoSvg />
            </div>
          );
        })}
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{marginTop: 52 + 10, marginBottom: 20}}
      >
        {renderCards()}
        {renderEntrepreneurAccounts()}
        {renderOtherMethods()}
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
