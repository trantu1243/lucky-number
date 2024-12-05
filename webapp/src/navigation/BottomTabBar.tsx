import React from 'react';

import {hooks} from '../hooks';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';

import {actions} from '../store/actions';

const tabs = [
  {
    id: 1,
    name: 'Dashboard',
    icon: svg.DashboardTabSvg,
  },
  {
    id: 2,
    name: 'Deposits',
    icon: svg.DepositTabSvg,
  },
  {
    id: 3,
    name: 'Loans',
    icon: svg.LoanTabSvg,
  },
  {
    id: 4,
    name: 'Notification',
    icon: svg.NotificationTabSvg,
  },
  {
    id: 5,
    name: 'More',
    icon: svg.MoreTabSvg,
  },
];

export const BottomTabBar: React.FC = () => {
  const dispatch = hooks.useAppDispatch();

  const currentTabScreen = hooks.useAppSelector(
    (state) => state.tabSlice.screen,
  );

  return (
    <nav
      style={{
        bottom: 0,
        zIndex: 999,
        width: '100%',
        position: 'fixed',
        maxWidth: '650px',
        paddingBottom: 20,
        backgroundColor: theme.colors.white,
      }}
      className='container'
    >
      <div
        style={{
          cursor: 'pointer',
          position: 'relative',
          ...utils.rowCenterSpcAround(),
          backgroundColor: theme.colors.mainDark,
          borderRadius: 14,
          padding: '18px 0',
        }}
      >
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
              }}
              onClick={() => dispatch(actions.setScreen(tab.name))}
            >
              <tab.icon
                key={tab.id}
                color={
                  currentTabScreen === tab.name
                    ? theme.colors.mainColor
                    : theme.colors.white
                }
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
