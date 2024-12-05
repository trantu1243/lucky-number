import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const privacyPolicy = [
  {
    id: 1,
    title: 'Terms',
    content:
      'By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, applicable laws and regulations and their compliance. If you disagree with any of the stated terms and conditions, you are prohibited from using or accessing this site. The materials contained in this site are secured by relevant copyright and trademark law.',
  },
  {
    id: 2,
    title: 'Use Licence',
    content:
      'Permission is allowed to temporarily download one duplicate of the materials (data or programming) on Company site for individual and non-business use only. This is just a permit of license and not an exchange of title',
  },
];

export const PrivacyPolicy: React.FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return <components.Header goBack={true} />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52 + 10, marginBottom: 20}}
        className='container'
      >
        <text.H2 style={{marginBottom: 20}}>Privacy policy</text.H2>
        {privacyPolicy.map((item, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div style={{marginBottom: isLast ? 0 : 30}}>
              <div style={{...utils.rowCenter(), marginBottom: 10}}>
                <text.H4 style={{marginRight: 4}}>{item.id}.</text.H4>
                <text.H4>{item.title}</text.H4>
              </div>
              <text.T16>{item.content}</text.T16>
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
