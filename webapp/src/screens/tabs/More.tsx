import React from 'react';

import {text} from '../../text';
import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {svg} from '../../assets/svg';
import {components} from '../../components';

const menu = [
  {
    id: 1,
    title: 'Add new card',
    icon: <svg.CardMenuSvg />,
    url: '/OpenNewCard',
  },
  {
    id: 2,
    title: 'Create invoice',
    icon: <svg.MenuEditSvg />,
    url: '/CreateInvoice',
  },
  {
    id: 3,
    title: 'Statistics',
    icon: <svg.BarSvg />,
    url: '/Statistics',
  },
  {
    id: 4,
    title: 'Scanner QR',
    icon: <svg.MaximizeSvg />,
    url: '/CreateInvoice',
  },
  {
    id: 5,
    title: 'FAQ',
    icon: <svg.HelpCircleSvg />,
    url: '/FAQ',
  },
  {
    id: 6,
    title: 'Support',
    icon: <svg.MessageSvg />,
    url: '/CreateInvoice',
  },
  {
    id: 7,
    title: 'Charity',
    icon: <svg.HeartSvg />,
    url: '/CreateInvoice',
  },
  {
    id: 8,
    title: 'Privacy policy',
    icon: <svg.FIleTextSvg />,
    url: '/PrivacyPolicy',
  },
];

export const More: React.FC = () => {
  const navigate = hooks.useAppNavigate();

  const renderBottomTabBar = () => {
    return <components.BottomTabBar />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 40, marginBottom: 20}}
        className='container'
      >
        <text.H2 style={{marginBottom: 20}}>More</text.H2>
        <div
          style={{
            width: '100%',
            ...utils.rowCenter({gap: 11, wrap: true}),
          }}
        >
          {menu.map((item, index, array) => {
            return (
              <div
                key={item.id}
                style={{
                  padding: 14,
                  backgroundColor: '#FFF6F2',
                  borderRadius: 10,
                  cursor: 'pointer',
                  userSelect: 'none',
                  flex: '1 1 calc(50% - 11px)',
                  ...utils.rowCenter({gap: 10}),
                }}
                onClick={() => navigate(item.url)}
              >
                {item.icon}
                <text.H5 numberOfLines={1}>{item.title}</text.H5>
              </div>
            );
          })}
        </div>
      </main>
    );
  };

  return (
    <div id='screen'>
      {renderContent()}
      {renderBottomTabBar()}
    </div>
  );
};
