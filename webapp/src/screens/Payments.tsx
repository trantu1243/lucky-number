import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const payments = [
  {
    id: 1,
    title: 'Money transfer',
    icon: <svg.MoneyExchangeSvg />,
    url: '',
  },
  {
    id: 2,
    title: 'Mobile payment',
    icon: <svg.MobilePaymentSvg />,
    url: '/MobilePayment',
  },
  {
    id: 3,
    title: 'IBAN payment',
    icon: <svg.PayCheckSvg />,
    url: '/IBANPayment',
  },
  {
    id: 4,
    title: 'Utility bills',
    icon: <svg.InvoiceSvg />,
    url: '',
  },
  {
    id: 5,
    title: 'Transport',
    icon: <svg.CarSvg />,
    url: '',
  },
  {
    id: 6,
    title: 'Insurance',
    icon: <svg.InsuranceSvg />,
    url: '',
  },
  {
    id: 7,
    title: 'Penalties',
    icon: <svg.YellowCardSvg />,
    url: '',
  },
  {
    id: 8,
    title: 'Charity',
    icon: <svg.CharitySvg />,
    url: '',
  },
];

export const Payments: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Payments'
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
        {payments.map((item, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              style={{
                ...utils.rowCenter(),
                cursor: 'pointer',
                userSelect: 'none',
                marginBottom: isLast ? 0 : 20,
              }}
              onClick={() => {
                if (item.url === '') {
                  return;
                }

                navigate(item.url);
              }}
            >
              {item.icon}
              <text.H6
                style={{
                  lineHeight: 1,
                  marginLeft: 14,
                  marginRight: 'auto',
                }}
              >
                {item.title}
              </text.H6>
              <svg.InfoSvg />
            </div>
          );
        })}
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
