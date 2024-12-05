import {FC, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {components} from '../components';

export const NewPassword: FC = () => {
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
        title='New password'
        goBack={true}
      />
    );
  };

  const renderContent = () => {
    return (
      <main style={{padding: '20px 20px 20px 20px', marginTop: 52}}>
        <text.T16 style={{marginBottom: 30}}>
          Enter new password and confirm.
        </text.T16>
        <custom.InputField
          clickable={true}
          placeholder='••••••••'
          type='password'
          leftIcon={<svg.KeySvg />}
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          clickable={true}
          type='password'
          placeholder='••••••••'
          leftIcon={<svg.KeySvg />}
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 14}}
        />
        <components.Button
          title='change password'
          onClick={() => {
            navigate('/ForgotPasswordSentEmail');
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
