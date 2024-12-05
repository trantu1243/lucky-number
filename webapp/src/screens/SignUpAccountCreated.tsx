import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {svg} from '../assets/svg';
import {components} from '../components';

export const SignUpAccountCreated: React.FC = () => {
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
        <svg.AccountUserSvg style={{marginBottom: 30}} />
        <text.H2 style={{marginBottom: 10}}>Account Created!</text.H2>
        <text.T16 style={{marginBottom: 30}}>
          Your account had beed created{'\n'}successfully.
        </text.T16>
        <components.Button
          title='Done'
          onClick={() => navigate('/TabNavigator')}
        />
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
