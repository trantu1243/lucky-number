import React, {useState, useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const cards = [
  {
    id: 1,
    cardUrl: 'https://george-fx.github.io/apitex_api/assets/cards/01.png',
    number: '**** **** **** 7895',
    balance: '4 863.27',
  },
  {
    id: 2,
    cardUrl: 'https://george-fx.github.io/apitex_api/assets/cards/02.png',
    number: '**** **** **** 5378',
    balance: '2 435.12',
  },
];

export const IBANPayment: React.FC = () => {
  const naviagte = hooks.useAppNavigate();

  const {pathname} = useLocation();
  const [selectedCard, setSelectedCard] = useState<number>(0);

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
        title='IBAN payment'
        goBack={true}
      />
    );
  };

  const renderBeneficiary = (): JSX.Element => {
    return (
      <div className='container'>
        <text.T14 style={{marginBottom: 10}}>Beneficiary info</text.T14>
        <custom.InputField
          leftIcon={<svg.HashSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='IBAN number'
        />
        <custom.InputField
          leftIcon={<svg.UserSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='Beneficiary name'
        />
        <custom.InputField
          leftIcon={<svg.KeySvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='BIC code'
        />
        <custom.InputField
          leftIcon={<svg.BriefcaseSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='Beneficiary bank'
        />
        <custom.InputField
          leftIcon={<svg.DollarSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder='Amount'
        />
        <div
          style={{
            width: '100%',
            padding: 14,
            backgroundColor: theme.colors.white,
            border: '1px solid #FFEFE6',
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <textarea
            placeholder='Comment'
            style={{
              width: '100%',
              height: 120,
              ...theme.fonts.SourceSansPro_400Regular,
            }}
          />
        </div>
      </div>
    );
  };

  const renderCards = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <div className='container'>
          <text.T14 style={{marginBottom: 10}}>Beneficiary info</text.T14>
        </div>

        <Swiper
          spaceBetween={14}
          slidesPerView={'auto'}
          pagination={{clickable: true}}
        >
          {cards.map((item: any) => {
            return (
              <SwiperSlide
                key={item.id}
                style={{
                  width: '80%',
                  padding: 12,
                  backgroundColor: theme.colors.white,
                  borderRadius: 14,
                  cursor: 'pointer',
                  userSelect: 'none',
                  ...utils.rowCenter({gap: 12}),
                  border:
                    selectedCard === item.id
                      ? `1px solid ${theme.colors.mainColor}`
                      : '1px solid #FFEFE6',
                }}
                onClick={() => setSelectedCard(item.id)}
              >
                <img
                  src={item.cardUrl}
                  alt='card'
                  style={{width: 62, height: 42, borderRadius: 6}}
                />
                <div>
                  <span
                    style={{
                      fontSize: 12,
                      ...theme.fonts.SourceSansPro_400Regular,
                      color: theme.colors.bodyTextColor,
                    }}
                  >
                    {item.number}
                  </span>
                  <text.H6>{item.balance}</text.H6>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Send'
        colorScheme='dark'
        containerStyle={{margin: '0 20px'}}
        onClick={() => naviagte('/PaymentSuccess')}
        // onClick={() => naviagte('/PaymentFailed')}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{marginTop: 52, marginBottom: 60}}>
        {renderBeneficiary()}
        {renderCards()}
        {renderButton()}
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
