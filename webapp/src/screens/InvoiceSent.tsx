import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {svg} from '../assets/svg';
import {components} from '../components';

export const InvoiceSent: React.FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const navigate = hooks.useAppNavigate();

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header logo={true} />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{justifyContent: 'center'}}
      >
        <svg.BillSvg style={{marginBottom: 30}} />
        <text.H2 style={{marginBottom: 10, whiteSpace: 'pre-line'}}>
          Your invoice has been {'\n'}sent!
        </text.H2>
        <text.T16 style={{marginBottom: 30}}>
          Qui ex aute ipsum duis. Incididunt adipisicing {'\n'}voluptate laborum
        </text.T16>
        <components.Button
          title='Done'
          onClick={() => navigate('/TabNavigator')}
          containerStyle={{width: '48%'}}
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
