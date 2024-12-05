import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const CreateInvoice: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  const [currency, setCurrency] = useState<string>('usd');

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
        title='Create invoice'
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
          leftIcon={<svg.UserSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='Company name'
        />
        <custom.InputField
          leftIcon={<svg.MapPinSvg />}
          rightIcon={<svg.ArrowDownSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='Country'
        />
        <custom.InputField
          leftIcon={<svg.EmailSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='Company email'
        />
        <custom.InputField
          leftIcon={<svg.DollarSvg />}
          containerStyle={{marginBottom: 30}}
          placeholder='Amount'
        />
        <div style={{marginBottom: 30}}>
          <text.T14 style={{marginBottom: 10}}>Choose currency</text.T14>
          <div style={{...utils.rowCenter({gap: 11})}}>
            {['usd', 'eur'].map((title) => {
              return (
                <div
                  key={title}
                  style={{
                    borderRadius: 6,
                    flex: '1 1 calc(50% - 5.5px)',
                    height: 30,
                    userSelect: 'none',
                    cursor: 'pointer',
                    border: `1px solid ${theme.colors.mainDark}`,
                    backgroundColor:
                      currency === title
                        ? theme.colors.mainDark
                        : theme.colors.transparent,
                    ...utils.flexCenter(),
                  }}
                  onClick={() => setCurrency(title)}
                >
                  <text.T14
                    style={{
                      textTransform: 'uppercase',
                      color:
                        currency === title
                          ? theme.colors.white
                          : theme.colors.mainDark,
                    }}
                  >
                    {title}
                  </text.T14>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            width: '100%',
            padding: '14px 20px',
            backgroundColor: theme.colors.white,
            border: '1px solid #FFEFE6',
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <textarea
            placeholder='Goods or services you provided'
            style={{
              width: '100%',
              height: 120,
              ...theme.fonts.SourceSansPro_400Regular,
            }}
          />
        </div>
        <text.T14 style={{marginBottom: 30}}>
          Bank fee is charged from the payer.
        </text.T14>
        <components.Button
          title='Send invoice'
          onClick={() => navigate('/InvoiceSent')}
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
