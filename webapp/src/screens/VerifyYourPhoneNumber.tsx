import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {components} from '../components';

export const VerifyYourPhoneNumber: React.FC = () => {
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
        title='Verify your phone number'
        goBack={true}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{padding: '77px 20px 0 20px'}}>
        <text.T16 style={{marginBottom: 30}}>
          We have sent you an SMS with a code to number +17 0123456789.
        </text.T16>
        <custom.InputField
          leftIcon={<svg.PhoneSvg />}
          containerStyle={{marginBottom: 14}}
          placeholder='+17 0123456789'
        />
        <components.Button
          title='confirm'
          onClick={() => {
            navigate('/ConfirmationCode');
          }}
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
