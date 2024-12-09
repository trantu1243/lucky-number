import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { text } from '../text';
import { hooks } from '../hooks';
import { utils } from '../utils';
import { svg } from '../assets/svg';
import { theme } from '../constants';
import { components } from '../components';
import { ErrorPage } from './ErrorPage';
import { useAppSelector } from '../store';

export interface IUserInfo {
  usd: number;
  level: string;
  won: number;
  createdAt: string;
  updatedAt: string;
}

export const Profile: React.FC = () => {

  const teleUser = useAppSelector(state => state.webappSlice.user);
  const [userInfo, setUserInfo] = useState<IUserInfo>({usd: 0, level: '', won: 0, createdAt: '', updatedAt: ''});
  const webapp = useAppSelector(state => state.webappSlice.webApp);

  const loanDetails = [
    { title: '💰Chips', content: (userInfo.usd ?? 0).toString() },
    { title: '🎖️Level', content: userInfo.level || 'N/A' },
    { title: '🎲Wins', content: (userInfo.won ?? 0).toString() },
    { title: '📅Player since', content: userInfo.createdAt || 'N/A' },
    { title: '📅Last played', content: userInfo.updatedAt || 'N/A' },
  ];

  const getUserInfo = useCallback(async ()=>{
    const body = webapp?.initDataUnsafe || {};
    console.log(JSON.stringify({initData: body}));
    const urlWithParams = `https://api.lucky-number.net/v1/user`;

    fetch(urlWithParams, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({initData: body})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserInfo(data);
      })
      .catch((error) => console.error(error));

  }, [webapp]);

  useEffect(()=>{
    getUserInfo()
  }, [getUserInfo])

  const { pathname } = useLocation();

  const navigate = hooks.useAppNavigate();

  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: -1, left: 0, behavior: 'smooth' });
    }, 10);
  }, [pathname]);

  if (!teleUser) 
    return  (<>
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
          src={teleUser.photo_url ? teleUser.photo_url : 'https://george-fx.github.io/apitex_api/assets/users/01.png'}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            margin: '0 auto',
            marginBottom: 14,
          }}
        />
        <text.H4 style={{ textAlign: 'center' }}>{teleUser.first_name} {teleUser.last_name }</text.H4>
        {/* <text.T16 style={{ textAlign: 'center' }}>+17 123 456 7890</text.T16> */}
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

  // const renderButton = (): JSX.Element => {
  //   return (
  //     <components.Button
  //       title='Log out'
  //       colorScheme='light'
  //       onClick={() => navigate('/SignIn')}
  //     />
  //   );
  // };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{ marginTop: 52 + 46, marginBottom: 20 }}
      >
        {renderUserInfo()}
        {renderInfo()}
        {renderMenu()}
        {/* {renderButton()} */}
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
