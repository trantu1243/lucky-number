import React, {useEffect} from 'react';

import {hooks} from '../hooks';
import {screens} from '../screens';
import {RootState} from '../store';
import {components} from '../components';

export const TabNavigator: React.FC = () => {
  const screen = hooks.useAppSelector(
    (state: RootState) => state.tabSlice.screen,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  const renderBackground = (): JSX.Element | null => {
    if (screen === 'Notification') {
      return <components.Background />;
    }

    return null;
  };

  const renderScreen = (): JSX.Element => {
    return (
      <div>
        {renderBackground()}
        {screen === 'Dashboard' && <screens.Dashboard />}
        {screen === 'Deposits' && <screens.Deposits />}
        {screen === 'Loans' && <screens.Loans />}
        {screen === 'Notification' && <screens.Notification />}
        {screen === 'More' && <screens.More />}
      </div>
    );
  };

  return renderScreen();
};
