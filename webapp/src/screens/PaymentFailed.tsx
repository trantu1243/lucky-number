import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const PaymentFailed: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header logo={true} />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{justifyContent: 'center'}}
      >
        <svg.CancelSvg style={{marginBottom: 30}} />
        <text.H2 style={{marginBottom: 30}}>
          Oops! Something went {'\n'} wrong.
        </text.H2>
        <div style={{marginBottom: 10}}>
          <span
            style={{
              fontSize: 28,
              ...theme.fonts.SourceSansPro_400Regular,
              color: theme.colors.mainDark,
            }}
          >
            364
          </span>
          <span
            style={{
              fontSize: 16,
              ...theme.fonts.SourceSansPro_400Regular,
              color: theme.colors.mainDark,
            }}
          >
            .00 USD
          </span>
        </div>
        <text.T16 style={{marginBottom: 30}}>
          Labore sunt culpa excepteur culpa ipsum. Labore {'\n'} occaecat ex
          nisi mollit.
        </text.T16>
        <div style={{...utils.rowCenterSpcBtw()}}>
          <components.Button
            title='Cancel'
            colorScheme='light'
            onClick={() => {
              navigate('/TabNavigator');
            }}
            containerStyle={{width: '48%'}}
          />
          <components.Button
            title='Try Again'
            containerStyle={{width: '48%'}}
            onClick={() => {}}
          />
        </div>
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
