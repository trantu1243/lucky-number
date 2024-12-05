import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {hooks} from '../hooks';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {components} from '../components';
import {utils} from '../utils';

export const EditPersonalInfo: React.FC = () => {
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
        title='Edit personal info'
        goBack={true}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{marginTop: 52 + 10, marginBottom: 20}}
      >
        <div
          style={{
            width: 70,
            height: 70,
            margin: '0 auto',
            marginBottom: 30,
            cursor: 'pointer',
            userSelect: 'none',
            position: 'relative',
            ...utils.flexCenter(),
          }}
        >
          <img
            alt='avatar'
            src='https://george-fx.github.io/apitex_api/assets/users/01.png'
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 50,
              position: 'absolute',
            }}
          />
          <div
            style={{
              inset: 0,
              borderRadius: 50,
              backgroundColor: 'rgba(27, 29, 77, 0.5)',
              position: 'absolute',
            }}
          />
          <svg.CameraSvg style={{zIndex: 3}} />
        </div>
        <custom.InputField
          leftIcon={<svg.UserSvg />}
          placeholder='Briley Henderson'
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          leftIcon={<svg.PhoneSvg />}
          placeholder='+17 123 456 7890'
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          leftIcon={<svg.EmailSvg />}
          placeholder='Enter your email'
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          leftIcon={<svg.CalendarSvg />}
          placeholder='MM/DD/YYYY'
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          leftIcon={<svg.MapPinSvg />}
          placeholder='Briley Henderson'
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
