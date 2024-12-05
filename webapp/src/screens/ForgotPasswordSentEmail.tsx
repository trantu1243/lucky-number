import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {svg} from '../assets/svg';
import {components} from '../components';

export const ForgotPasswordSentEmail: React.FC = () => {
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
        <svg.PadLockSvg style={{marginBottom: 30}} />
        <text.H2 style={{marginBottom: 20, whiteSpace: 'pre-line'}}>
          Your password has {'\n'} been reset!
        </text.H2>
        <text.T16 style={{marginBottom: 30}}>
          Labore sunt culpa excepteur culpa ipsum. Labore {'\n'} occaecat ex
          nisi mollit.
        </text.T16>
        <components.Button
          title='Done'
          containerStyle={{width: '48%'}}
          onClick={() => navigate('/SignIn')}
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
