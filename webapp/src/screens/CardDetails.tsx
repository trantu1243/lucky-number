import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const limits = [
  {
    id: 1,
    title: 'Online payments',
    description: 'Default limit: 100 USD per day',
    icon: <svg.GlobeSvg />,
    url: '/Payments',
  },
  {
    id: 2,
    title: 'ATM withdrawals',
    description: 'Default limit: 3000 USD per day',
    icon: <svg.DollarDetailsSvg />,
    url: '',
  },
];

const security = [
  {
    id: 1,
    title: 'Change PIN code',
    icon: <svg.KeyDetailsSvg />,
    url: '/ChangePINCode',
  },
  {
    id: 2,
    title: 'Reissue the card',
    icon: <svg.RefreshSvg />,
    url: '/OpenNewCard',
  },
  {
    id: 3,
    title: 'Block the card',
    icon: <svg.LockSvg />,
    url: '',
  },
  {
    id: 4,
    title: 'Сlose the card',
    icon: <svg.TrashSvg />,
    url: '',
  },
];

export const CardDetails: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  const [defaultCard, setDefaultCard] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        goBack={true}
        documentIcon={true}
      />
    );
  };

  const renderCard = (): JSX.Element => {
    return (
      <img
        src={require('../assets/other/02.png')}
        alt='card'
        style={{
          width: '80%',
          height: 'auto',
          borderRadius: 14,
          margin: '0 auto',
          marginBottom: 20,
          marginTop: 10,
        }}
      />
    );
  };

  const renderButtons = (): JSX.Element => {
    return (
      <div
        className='container'
        style={{...utils.rowCenter({gap: 17}), marginBottom: 30}}
      >
        <div
          style={{
            flex: '1 1 calc(33.333% - 8.5px)',
            backgroundColor: '#FFF7F2',
            border: '1px solid #FFEFE6',
            borderRadius: 10,
            padding: '14px 12px 14px 14px',
            ...utils.rowCenter(),
          }}
        >
          <img
            alt='visa'
            src={require('../assets/other/03.png')}
            style={{width: 24, height: 18}}
          />
          <text.H5 style={{marginRight: 'auto', marginLeft: 12}}>
            Apple Pay
          </text.H5>
          <svg.PlusSvg />
        </div>
        <div
          style={{
            flex: '1 1 calc(33.333% - 8.5px)',
            backgroundColor: '#FFF7F2',
            border: '1px solid #FFEFE6',
            borderRadius: 10,
            padding: '14px 12px 14px 14px',
            cursor: 'pointer',
            userSelect: 'none',
            ...utils.rowCenterSpcBtw(),
          }}
          onClick={() => setDefaultCard(!defaultCard)}
        >
          <text.H5>Default card</text.H5>
          <div
            style={{
              width: 41,
              backgroundColor: defaultCard ? '#55ACEE' : 'lightgray',
              borderRadius: 12,
              padding: '1.5px 1.5px',
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: defaultCard ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                width: 20.9,
                height: 20.9,
                backgroundColor: '#FFFFFF',
                borderRadius: 11,
                alignSelf: defaultCard ? 'flex-end' : 'flex-start',
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderLimits = (): JSX.Element => {
    return (
      <div
        style={{marginBottom: 30}}
        className='container'
      >
        <text.T14 style={{marginBottom: 10}}>Limits</text.T14>
        {limits.map((limit, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                ...utils.rowCenterSpcBtw(),
                marginBottom: isLast ? 0 : 14,
              }}
              onClick={() => {
                if (limit.url === '') {
                  return;
                }
                navigate(limit.url);
              }}
            >
              <div>
                <div style={{...utils.rowCenter({gap: 10})}}>
                  {limit.icon}
                  <text.H5>{limit.title}</text.H5>
                </div>
                <span style={{fontSize: 12, color: theme.colors.bodyTextColor}}>
                  {limit.description}
                </span>
              </div>
              <svg.RightArrowSvg />
            </div>
          );
        })}
      </div>
    );
  };

  const renderSecurity = (): JSX.Element => {
    return (
      <div className='container'>
        <text.T14 style={{marginBottom: 10}}>Security</text.T14>
        {security.map((item, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              style={{
                ...utils.rowCenter(),
                marginBottom: isLast ? 0 : 20,
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onClick={() => {
                if (item.url === '') {
                  return;
                }

                navigate(item.url);
              }}
            >
              {item.icon}
              <text.H5
                style={{
                  marginLeft: 10,
                  marginRight: 'auto',
                  color:
                    item.title === 'Block the card' ||
                    item.title === 'Сlose the card'
                      ? theme.colors.mainColor
                      : theme.colors.mainDark,
                }}
              >
                {item.title}
              </text.H5>
              <svg.RightArrowSvg />
            </div>
          );
        })}
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{marginTop: 52, marginBottom: 20}}>
        {renderCard()}
        {renderButtons()}
        {renderLimits()}
        {renderSecurity()}
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
