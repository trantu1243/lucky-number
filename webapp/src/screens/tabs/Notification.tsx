import React from 'react';

import {text} from '../../text';
import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {custom} from '../../custom';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';

const notifications = [
  {
    id: 1,
    title: 'Your loan application has been approved!',
    date: 'Apr 12, 2023 at 12:47 PM',
    icon: <svg.NotificationCheckSvg />,
  },
  {
    id: 2,
    title: 'The loan repayment period expires!',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: 'Apr 12, 2023 at 12:47 PM',
    icon: <svg.AlertSvg />,
  },
  {
    id: 3,
    title: 'Your loan application was rejected!',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    date: 'Apr 12, 2023 at 12:47 PM',
    icon: <svg.RejectedSvg />,
  },
  {
    id: 4,
    title: 'Your piggy bank is full!',
    date: 'Apr 12, 2023 at 12:47 PM',
    icon: <svg.NotificationCheckSvg />,
  },
];

export const Notification: React.FC = () => {
  const renderBottomTabBar = () => {
    return <components.BottomTabBar />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52, paddingBottom: 100}}
        className='container'
      >
        <text.H2 style={{marginBottom: 20}}>Notifications</text.H2>
        {notifications.map((notification, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              style={{
                padding: 20,
                borderRadius: 10,
                border: '1px solid #FFEFE6',
                marginBottom: isLast ? 0 : 10,
                backgroundColor: theme.colors.white,
              }}
            >
              <div style={{...utils.rowCenter({gap: 8})}}>
                <div>{notification.icon}</div>
                <text.H5 numberOfLines={1}>{notification.title}</text.H5>
              </div>
              {notification.description && (
                <text.T16 style={{marginTop: 14}}>
                  {notification.description}
                </text.T16>
              )}
              <div
                style={{
                  fontSize: 12,
                  color: theme.colors.bodyTextColor,
                  lineHeight: 1.6,
                  ...theme.fonts.SourceSansPro_400Regular,
                  marginTop: 14,
                }}
              >
                {notification.date}
              </div>
            </div>
          );
        })}
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
