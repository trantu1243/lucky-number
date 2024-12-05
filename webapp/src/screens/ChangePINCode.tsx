import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {hooks} from '../hooks';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {components} from '../components';

export const ChangePINCode: React.FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const navigate = hooks.useAppNavigate();

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Change PIN code'
        goBack={true}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52 + 10, marginBottom: 20}}
        className='container'
      >
        <custom.InputField
          placeholder='••••'
          leftIcon={<svg.KeySvg />}
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          placeholder='New PIN'
          leftIcon={<svg.KeySvg />}
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          placeholder='Confirm PIN'
          leftIcon={<svg.KeySvg />}
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 14}}
        />
        <components.Button
          title='Save'
          onClick={() => navigate(-1)}
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
