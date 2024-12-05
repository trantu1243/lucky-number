import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {actions} from '../store/actions';
import {hooks, RootState} from '../hooks';

type Props = {
  user?: boolean;
  logo?: boolean;
  title?: string;
  line?: boolean;
  search?: boolean;
  burger?: boolean;
  goBack?: boolean;
  basket?: boolean;
  creditCard?: boolean;
  documentIcon?: boolean;
};

export const Header: React.FC<Props> = ({
  logo,
  line,
  user,
  title,
  goBack,
  creditCard,
  documentIcon,
}) => {
  const navigate = useNavigate();

  const renderGoBack = (): JSX.Element | null => {
    const canGoBack = window.history.length > 1;

    if (goBack && canGoBack) {
      return (
        <button
          style={{position: 'absolute', left: 0, padding: 20}}
          onClick={() => navigate(-1)}
        >
          <svg.GoBackSvg />
        </button>
      );
    }

    return null;
  };

  const renderUser = (): JSX.Element | null => {
    if (!user) return null;
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          padding: 20,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none',
        }}
      >
        <div
          style={{...utils.rowCenter()}}
          onClick={() => {
            navigate('/Profile');
          }}
        >
          <img
            alt='avatar'
            src='https://george-fx.github.io/apitex/users/01.png'
            style={{width: 26, marginRight: 10, borderRadius: 13}}
          />
          <text.T16 style={{color: theme.colors.mainDark}}>
            Briley Henderson
          </text.T16>
        </div>
      </div>
    );
  };

  const renderTitle = (): JSX.Element => {
    return (
      <text.T16
        style={{
          left: '50%',
          textAlign: 'center',
          position: 'absolute',
          width: 'calc(100% - 100px)',
          transform: 'translateX(-50%)',
          color: theme.colors.mainDark,
        }}
      >
        {title}
      </text.T16>
    );
  };

  const renderCreditCard = (): JSX.Element | null => {
    if (!creditCard) return null;
    return (
      <button
        style={{
          position: 'absolute',
          right: 0,
          padding: '0px 20px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: 5,
        }}
        onClick={() => {
          navigate('/CardMenu');
        }}
      >
        <svg.CreditCardSvg />
      </button>
    );
  };

  const renderDocument = (): JSX.Element | null => {
    if (!documentIcon) return null;
    return (
      <button
        style={{
          position: 'absolute',
          right: 0,
          padding: '0px 20px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: 5,
        }}
      >
        <svg.DocumentSvg />
      </button>
    );
  };

  const headerStyle: React.CSSProperties = {
    height: 52,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: 0,
    position: 'fixed',
    maxWidth: 650,
    zIndex: 6,
    backgroundColor: theme.colors.white,
    borderBottom: line ? `1px solid ${theme.colors.aliceBlue}` : 'none',
  };

  return (
    <header style={{...headerStyle}}>
      {renderGoBack()}
      {renderUser()}
      {renderTitle()}
      {renderDocument()}
      {renderCreditCard()}
    </header>
  );
};
