import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const SignUp: React.FC = () => {
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
    return <components.Header goBack={true} />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{marginTop: 52, paddingTop: '18%', paddingBottom: 20, zIndex: 1}}
      >
        <text.H1 style={{marginBottom: 30}}>Sign up!</text.H1>
        <custom.InputField
          leftIcon={<svg.UserSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='Briley Henderson'
        />
        <custom.InputField
          leftIcon={<svg.EmailSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='brileyhenderson@mail.com'
        />
        <custom.InputField
          leftIcon={<svg.KeySvg />}
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='••••••'
        />
        <custom.InputField
          leftIcon={<svg.KeySvg />}
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 14}}
          placeholder='••••••'
        />
        <components.Button
          title='Sign up'
          containerStyle={{marginBottom: 14}}
          onClick={() => navigate('/VerifyYourPhoneNumber')}
        />
        <div style={{...utils.rowCenter(), marginBottom: 40}}>
          <text.T16 style={{marginRight: 4}}>Already have an account?</text.T16>
          <text.T16
            onClick={() => navigate('/SignIn')}
            style={{cursor: 'pointer', color: theme.colors.mainColor}}
          >
            Sign in.
          </text.T16>
        </div>
        <div>
          <text.T16 style={{marginBottom: 14}}>
            Sign in with social networks:
          </text.T16>
          {/* Socials */}
          <div
            style={{
              ...utils.rowCenterSpcBtw(),
              marginBottom: 20,
              width: '100%',
            }}
          >
            <div
              style={{
                width: '31%',
                borderRadius: 8,
                padding: '13px 0',
                ...utils.flexCenter(),
                backgroundColor: '#FFD9C3',
              }}
              onClick={() => {}}
            >
              <svg.FacebookSvg />
            </div>
            <div
              style={{
                width: '31%',
                borderRadius: 8,
                padding: '13px 0',
                ...utils.flexCenter(),
                backgroundColor: '#FFD9C3',
              }}
              onClick={() => {}}
            >
              <svg.TwitterSvg />
            </div>
            <div
              style={{
                width: '31%',
                borderRadius: 8,
                padding: '13px 0',
                ...utils.flexCenter(),
                backgroundColor: '#FFD9C3',
              }}
              onClick={() => {}}
            >
              <svg.GoogleSvg />
            </div>
          </div>
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
