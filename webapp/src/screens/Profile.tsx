import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { text } from '../text';
import { hooks } from '../hooks';
import { utils } from '../utils';
import { svg } from '../assets/svg';
import { theme } from '../constants';
import { components } from '../components';
import { ErrorPage } from './ErrorPage';

const loanDetails = [
  {
    title: '💰Chips',
    content: '50',
  },
  {
    title: '🎖️Level',
    content: 'Beginner (0/50)',
  },
  {
    title: '🎲Wins',
    content: '24',
  },
  {
    title: '📅Player since',
    content: '2024-12-05',
  },
  {
    title: '📅Last played',
    content: '2024-12-05',
  },
];

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string; 
  username?: string;  
  photo_url?: string; 
}

export const Profile: React.FC = () => {

  const [user, setUser] = useState<TelegramUser | null>(null);
  const [telegramm, setTele] = useState(null);

  const { pathname } = useLocation();

  const navigate = hooks.useAppNavigate();

  const [faceID, setFaceID] = useState(true);
  const [notification, setNotification] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: -1, left: 0, behavior: 'smooth' });
    }, 10);
  }, [pathname]);

  useEffect(() => {
    const telegram = (window as any).Telegram?.WebApp;
    setTele(telegram);
    if (telegram && telegram.initDataUnsafe?.user) {
      console.log(telegram.initDataUnsafe.user);
      setUser(telegram.initDataUnsafe.user as TelegramUser);
    }
  }, []);

  if (!user) 
    return  (<>
      <div>{telegramm}</div>
      <ErrorPage />
    </>
    
  )

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
        style={{ marginBottom: 30, cursor: 'pointer', userSelect: 'none' }}
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
        <text.H4 style={{ textAlign: 'center' }}>Briley Henderson</text.H4>
        <text.T16 style={{ textAlign: 'center' }}>+17 123 456 7890</text.T16>
      </div>
    );
  };

  const renderInfo = (): JSX.Element => {
    return (
      <div style={{ marginBottom: 30 }}>
        {loanDetails.map((item, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              style={{
                ...utils.rowCenterSpcBtw(),
                padding: '0 20px',
                marginBottom: isLast ? 0 : 14,
              }}
            >
              <text.T14 style={{ marginBottom: 10 }}>{item.title}</text.T14>
              <text.H6>{item.content}</text.H6>
            </div>
          );
        })}
      </div>
    )
  }

  const renderMenu = (): JSX.Element => {
    const btnStyle = {
      borderRadius: 10,
      backgroundColor: '#FFF7F2',
      padding: '10px 20px 10px 10px',
      ...utils.rowCenter(),
    };

    return (
      <div style={{ marginBottom: 30 }}>

        <div style={{ ...btnStyle, cursor: 'pointer', userSelect: 'none' }}>
          <svg.TranslateSvg />
          <text.H5 style={{ marginLeft: 10, marginRight: 'auto' }}>
            Language
          </text.H5>
          <div style={{ ...utils.rowCenter({ gap: 11 }) }}>
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
        style={{ marginTop: 52 + 46, marginBottom: 20 }}
      >
        {renderUserInfo()}
        {renderInfo()}
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
