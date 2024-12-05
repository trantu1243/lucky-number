import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {components} from '../components';

export const MobilePayment: React.FC = () => {
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
    return (
      <components.Header
        title='Mobile payment'
        goBack={true}
      />
    );
  };

  const renderInputFields = (): JSX.Element => {
    return (
      <div>
        <custom.InputField
          leftIcon={<svg.PhoneSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='+171234567890'
        />
        <custom.InputField
          leftIcon={<svg.DollarSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='Amount'
        />
      </div>
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <div style={{...utils.rowCenterSpcBtw(), marginBottom: 20}}>
        <text.T14>Your balance: 4 863.27 USD</text.T14>
        <text.T14>No fees</text.T14>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Confirm'
        onClick={() => navigate('/TopUpPayment')}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52}}
        className='container'
      >
        {renderInputFields()}
        {renderDescription()}
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
