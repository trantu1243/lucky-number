import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const TransactionDetails: React.FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();
  const {transaction} = location.state;

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);
  // setTimeout(() => { window.scrollTo(0, 0); }, 100);

  const renderHeader = (): JSX.Element => {
    return <components.Header goBack={true} />;
  };

  const renderTopInfo = (): JSX.Element => {
    return (
      <div
        style={{
          marginBottom: 25,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: 40,
            marginBottom: 10,
            textAlign: 'center',
            color:
              transaction.direction === 'in'
                ? '#55ACEE'
                : theme.colors.mainDark,
          }}
        >
          {transaction.direction === 'in' ? '+' : '-'}{' '}
          {transaction.amount.toFixed(2)} USD
        </div>
        <text.T14 style={{marginBottom: 20}}>Apr 10, 2023 at 11:34 AM</text.T14>
        <div>{transaction.date}</div>
        <svg.TransactionCheckSvg />
      </div>
    );
  };

  const renderBottomInfo = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        {transaction.type === 'Money transfer' && (
          <div style={{...utils.rowCenterSpcBtw()}}>
            <text.T16>Sent to</text.T16>
            <text.H5 style={{marginBottom: 14}}>{transaction.name}</text.H5>
          </div>
        )}
        <div style={{...utils.rowCenterSpcBtw()}}>
          <text.T16>Card</text.T16>
          <text.H5 style={{marginBottom: 14}}>**** 4253</text.H5>
        </div>
        <div style={{...utils.rowCenterSpcBtw()}}>
          <text.T16>Amount</text.T16>
          <text.H5 style={{marginBottom: 14}}>
            {transaction.amount.toFixed(2)} USD
          </text.H5>
        </div>
        <div style={{...utils.rowCenterSpcBtw()}}>
          <text.T16>Fee</text.T16>
          <text.H5 style={{marginBottom: 14}}>1.8 USD</text.H5>
        </div>
        <div style={{...utils.rowCenterSpcBtw()}}>
          <text.T16>Residual balance</text.T16>
          <text.H5 style={{marginBottom: 14}}>4 863.27 USD</text.H5>
        </div>
      </div>
    );
  };

  const renderButtons = (): JSX.Element => {
    return (
      <div style={{...utils.rowCenter({gap: 17})}}>
        <components.Button
          colorScheme='light'
          title='repeat transfer'
          containerStyle={{flex: 1}}
          onClick={() => {}}
        />
        <components.Button
          title='Download PDF'
          containerStyle={{flex: 1}}
          onClick={() => {}}
        />
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52 + 10, marginBottom: 10}}
        className='container'
      >
        {renderTopInfo()}
        {renderBottomInfo()}
        {renderButtons()}
      </main>
    );
  };

  return (
    <div id='screen'>
      <components.ScrollToTop />
      {renderHeader()}
      {renderContent()}
    </div>
  );
};
