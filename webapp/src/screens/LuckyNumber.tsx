import React from 'react';

import './css/lucky-number.css';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import {items} from '../items';
import {OperationType} from '../types';

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

const operations: OperationType[] = [
    {
      id: 1,
      title: 'Play',
      icon: <svg.ReceiveSvg />,
      url: '/deposit',
    },
    {
      id: 2,
      title: 'Join Telegram',
      icon: <svg.DollarSignSvg />,
      url: '/FundTransfer',
    },
  ];

export const LuckyNumber: React.FC = () => {
  const renderHeader = (): JSX.Element => {
      return (
      <components.Header
          title='Open deposit'
          goBack={true}
      />
      );
  };

  const renderOperations = (): JSX.Element => {
    return (
      <div style={{marginBottom: 10}}>
        <custom.ScrollView>
          {operations.map((operation, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <items.Operation
                isLast={isLast}
                operation={operation}
                key={operation.id || index}
              />
            );
          })}
        </custom.ScrollView>
      </div>
    );
  };

  const renderLatestTransactions = (): JSX.Element => {
      return (
        <components.WinnerList />
      )
    }

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52, paddingBottom: 100}}
        className='container'
      >
        <text.H2 style={{marginBottom: 20}}>Lucky Number</text.H2>
        {renderOperations()}
        <components.NotificationLine content='Kính gửi quý khách hàng, hệ thống sẽ tạm dừng hoạt động sau 00:30 tối. Cảm ơn sự ủng hộ và chúc quý khách ngày mới thật nhiều may mắn!'/>

            <div
              style={{
                padding: 20,
                borderRadius: 10,
                border: '1px solid #FFEFE6',
                marginBottom: 10,
                backgroundColor: theme.colors.white,
              }}
            >
              <div style={{...utils.rowCenter({gap: 8})}}>
                
                <text.H5 numberOfLines={1}>❓INSTRUCT - 🍀LUCKY NUMBER </text.H5>
              </div>
                <text.T16 style={{marginTop: 14}}>
                1️⃣ Press "Start" to get 10 random numbers 🔢 (hashed with SHA-256 🔐).<br/>
2️⃣ Enter a number sequence 🔢 (0-9 digits).<br/>
3️⃣ Enter your bet 💰.<br/><br/>
➕ Add the sequences. If the last two digits are:<br/>

✅ 00, 10, 20, 30, 40, 50, 60, 70, 80, 90 ✅ ={'>'} 🔼 Win x1.95 chips 🔼<br/>

🎊 10, 12, 13, 14, 15, 16, 17 🎊 ={'>'} 🎉 Win x2.8 chips 🎉<br/>

💎 18, 28, 38, 48, 58 💎 ={'>'} ✨ Win x3.85 chips ✨<br/>

🔥 33, 77, 88 🔥 ={'>'} 💥 Win x4.8 chips 💥
                </text.T16>  
                <hr style={{margin: '15px 0', backgroundColor: 'gray', border: '1px solid gray'}} />
                <p className="blink" style={{color: theme.colors.whiteText, textAlign: 'justify'}}>
                    Note: Results are revealed in Step 1; your input in Step 2 determines the outcome. The game is fully transparent.
                </p>     
            </div>
        {renderLatestTransactions()}
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
