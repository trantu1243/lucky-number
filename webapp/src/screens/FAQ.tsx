import React, {useState, useEffect} from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const FAQData = [
  {
    id: 1,
    title: 'How do I send a wire transfer?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 2,
    title: 'Is there any fee for receiving a wire transfer?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    title: 'How does the identification code process work?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 4,
    title: 'Does Fingerprint login work for all devices?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 5,
    title: 'How to send an invoice?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

export const FAQ: React.FC = () => {
  const {pathname} = useLocation();
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='FAQ'
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
        <Accordion.Root
          type='single'
          collapsible={true}
        >
          {FAQData?.map((item: any, index) => {
            const isOpen = openItem === item.id;
            return (
              <Accordion.Item
                key={item.id}
                value={item.id}
                onClick={() => setOpenItem(isOpen ? null : item.id)}
              >
                <Accordion.Trigger
                  style={{
                    flexDirection: 'column',
                    width: '100%',
                    display: 'flex',
                    backgroundColor: '#FFF7F2',
                    padding: '15px 20px',
                    borderRadius: 10,
                    ...utils.rowCenterSpcBtw(),
                    marginBottom: 10,
                    border: isOpen ? '1px solid #FFA177' : '1px solid #FFF7F2',
                  }}
                >
                  <text.H5
                    numberOfLines={1}
                    style={{marginRight: 20}}
                  >
                    {item.title}
                  </text.H5>
                  {isOpen ? <svg.OpenSvg /> : <svg.CloseSvg />}
                </Accordion.Trigger>
                <Accordion.Content style={{marginBottom: 20, marginTop: 20}}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <div
                      style={{
                        height: 'auto',
                        backgroundColor: theme.colors.mainColor,
                        width: 2,
                        marginRight: 18,
                      }}
                    />
                    <div>
                      <text.T16>{item.content}</text.T16>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
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
