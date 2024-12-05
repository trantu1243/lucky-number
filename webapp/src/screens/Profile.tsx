import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const Profile: React.FC = () => {
  const {pathname} = useLocation();

  const navigate = hooks.useAppNavigate();

  const [faceID, setFaceID] = useState(true);
  const [notification, setNotification] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Profile'
        goBack={true}
      />
    );
  };

  const renderUserInfo = (): JSX.Element => {
    return (
      <div
        style={{marginBottom: 30, cursor: 'pointer', userSelect: 'none'}}
        onClick={() => navigate('/EditPersonalInfo')}
      >
        <img
          alt='avatar'
          src='https://george-fx.github.io/apitex_api/assets/users/01.png'
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            margin: '0 auto',
            marginBottom: 14,
          }}
        />
        <text.H4 style={{textAlign: 'center'}}>Briley Henderson</text.H4>
        <text.T16 style={{textAlign: 'center'}}>+17 123 456 7890</text.T16>
      </div>
    );
  };

  const renderMenu = (): JSX.Element => {
    const btnStyle = {
      borderRadius: 10,
      backgroundColor: '#FFF7F2',
      padding: '10px 20px 10px 10px',
      ...utils.rowCenter(),
    };

    return (
      <div style={{marginBottom: 30}}>
        <div
          style={{
            ...btnStyle,
            marginBottom: 8,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => navigate('/EditPersonalInfo')}
        >
          <svg.ProfileUserSvg />
          <text.H5 style={{marginLeft: 10, marginRight: 'auto'}}>
            Personal Info
          </text.H5>
          <svg.RightArrowSvg />
        </div>
        <div
          style={{
            ...btnStyle,
            marginBottom: 10,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => setNotification(!notification)}
        >
          <svg.MessageCircelSvg />
          <text.H5 style={{marginLeft: 10, marginRight: 'auto'}}>
            Notifications
          </text.H5>
          <div
            style={{
              width: 41,
              backgroundColor: notification ? '#55ACEE' : 'lightgray',
              borderRadius: 12,
              padding: '1.5px 1.5px',
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: notification ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                width: 20.9,
                height: 20.9,
                backgroundColor: '#FFFFFF',
                borderRadius: 11,
                alignSelf: notification ? 'flex-end' : 'flex-start',
              }}
            />
          </div>
        </div>
        <div
          style={{
            ...btnStyle,
            marginBottom: 10,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => setFaceID(!faceID)}
        >
          <svg.FaceIDSvg />
          <text.H5 style={{marginLeft: 10, marginRight: 'auto'}}>
            Face ID
          </text.H5>
          <div
            style={{
              width: 41,
              backgroundColor: faceID ? '#55ACEE' : 'lightgray',
              borderRadius: 12,
              padding: '1.5px 1.5px',
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: faceID ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                width: 20.9,
                height: 20.9,
                backgroundColor: '#FFFFFF',
                borderRadius: 11,
                alignSelf: faceID ? 'flex-end' : 'flex-start',
              }}
            />
          </div>
        </div>
        <div style={{...btnStyle, cursor: 'pointer', userSelect: 'none'}}>
          <svg.TranslateSvg />
          <text.H5 style={{marginLeft: 10, marginRight: 'auto'}}>
            Language
          </text.H5>
          <div style={{...utils.rowCenter({gap: 11})}}>
            <span
              style={{
                fontSize: 12,
                color: theme.colors.bodyTextColor,
                ...theme.fonts.SourceSansPro_400Regular,
              }}
            >
              Eng
            </span>
            <svg.RightArrowSvg />
          </div>
        </div>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Log out'
        colorScheme='light'
        onClick={() => navigate('/SignIn')}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{marginTop: 52 + 46, marginBottom: 20}}
      >
        {renderUserInfo()}
        {renderMenu()}
        {renderButton()}
      </main>
    );
  };

  return (
    <div id='screen'>
      {renderHeader()}
      {renderContent()}
    </div>
  );
};
