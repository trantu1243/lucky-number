import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {theme} from '../constants';
import {components} from '../components';

export const CardMenu: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Card menu'
        goBack={true}
      />
    );
  };

  const renderCards = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14
          style={{marginBottom: 10}}
          numberOfLines={1}
        >
          Cards
        </text.T14>
        <div style={{...utils.rowCenter({gap: 11})}}>
          <img
            src='https://george-fx.github.io/apitex_api/assets/cards/05.png'
            alt='card'
            style={{
              width: 'calc(50% - 5.5px)',
              borderRadius: 10,
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => {
              navigate('/CardDetails');
            }}
          />
          <img
            src='https://george-fx.github.io/apitex_api/assets/cards/06.png'
            alt='card'
            style={{
              width: 'calc(50% - 5.5px)',
              borderRadius: 10,
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => {
              navigate('/CardDetails');
            }}
          />
        </div>
      </div>
    );
  };

  const renderOngoingCards = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14
          numberOfLines={1}
          style={{marginBottom: 10}}
        >
          Ongoing credits
        </text.T14>
        <img
          src='https://george-fx.github.io/apitex_api/assets/cards/07.png'
          alt='card'
          style={{width: 'calc(50% - 5.5px)', borderRadius: 10}}
        />
      </div>
    );
  };

  const renderEntrepreneurAccount = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14
          numberOfLines={1}
          style={{marginBottom: 10}}
        >
          Entrepreneur accounts
        </text.T14>
        <div
          style={{
            backgroundColor: '#FFF7F2',
            borderRadius: 10,
            padding: 12,
            ...utils.rowCenter({gap: 12}),
          }}
        >
          <img
            alt='card'
            style={{width: 62}}
            src={require('../assets/other/05.png')}
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
              US**********************4571
            </div>
            <text.H6 numberOfLines={1}>39 863.62 USD</text.H6>
          </div>
        </div>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='+ Add new card'
        colorScheme='light'
        containerStyle={{marginBottom: 20}}
        onClick={() => {
          navigate('/OpenNewCard');
        }}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{marginTop: 52 + 10, marginBottom: 20}}
      >
        {renderCards()}
        {renderOngoingCards()}
        {renderEntrepreneurAccount()}
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
