import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const ForgotPassword: React.FC = () => {
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

  const renderHeader = () => {
    return (
      <components.Header
        title='Forgot password'
        goBack={true}
      />
    );
  };

  const renderContent = () => {
    return (
      <main style={{padding: '30px 20px 20px 20px', marginTop: 52}}>
        <text.T16 style={{marginBottom: 30, color: theme.colors.textColor}}>
          Please enter your email address. You will receive a link to create a
          new password via email.
        </text.T16>
        <custom.InputField
          leftIcon={<svg.EmailSvg />}
          rightIcon={<svg.CheckSvg />}
          placeholder='brileyhenderson@mail.com'
          containerStyle={{marginBottom: 14}}
        />
        <components.Button
          title='send'
          onClick={() => {
            navigate('/NewPassword');
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
