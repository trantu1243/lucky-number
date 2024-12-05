import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const periods = [
  {
    id: 1,
    title: '3 mos',
  },
  {
    id: 2,
    title: '12 mos',
  },
  {
    id: 3,
    title: '24 mos',
  },
  {
    id: 4,
    title: '6 mos',
  },
  {
    id: 5,
    title: '18 mos',
  },
  {
    id: 6,
    title: '36 mos',
  },
];

export const OpenNewLoan: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[2].title,
  );
  const [earlyLoanRepayment, setEarlyLoanRepayment] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Open new loan'
        goBack={true}
      />
    );
  };

  const renderCurrency = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10, marginTop: 10}}>
          Choose currency
        </text.T14>
        <div style={{...utils.rowCenter({gap: 11})}}>
          {['USD', 'EUR'].map((title) => {
            return (
              <div
                key={title}
                style={{
                  borderRadius: 6,
                  flex: '1 1 calc(50% - 5.5px)',
                  height: 30,
                  ...utils.flexCenter(),
                  textAlign: 'center',
                  userSelect: 'none',
                  cursor: 'pointer',
                  border: `1px solid ${theme.colors.mainDark}`,
                  backgroundColor:
                    currency === title
                      ? theme.colors.mainDark
                      : theme.colors.white,
                }}
                onClick={() => setCurrency(title as 'USD' | 'EUR')}
              >
                <text.T14
                  style={{
                    textTransform: 'capitalize',
                    color:
                      currency === title
                        ? theme.colors.white
                        : theme.colors.mainDark,
                  }}
                >
                  {title}
                </text.T14>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChooseLoanPeriod = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>Choose loan period</text.T14>
        <div style={{display: 'flex', gap: 10}}>
          {/* Block 01 */}
          <div
            style={{
              flex: '1 1 calc(33.333% - 10px)',
              backgroundColor: '#FFF7F2',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              aspectRatio: '1/1',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                ...theme.fonts.SourceSansPro_400Regular,
                fontSize: 12,
                textTransform: 'capitalize',
                color: theme.colors.mainColor,
                marginBottom: 8,
                marginTop: 10,
              }}
            >
              You rate
            </span>
            <span
              style={{
                ...theme.fonts.SourceSansPro_400Regular,
                fontSize: 24,
                textTransform: 'capitalize',
                color: theme.colors.mainColor,
                marginBottom: 8,
              }}
            >
              13 %
            </span>
          </div>
          {/* Block 02 */}
          <div
            style={{
              flex: '1 1 calc(33.333% - 10px)',
              aspectRatio: '1/1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            {periods.slice(0, 3).map((period, index, array) => {
              return (
                <div
                  key={period.id}
                  title={period.title}
                  style={{
                    flex: '1 1 calc(33.333% - 10px)',
                    width: '100%',
                    border: `1px solid ${theme.colors.mainDark}`,
                    borderRadius: 6,
                    display: 'flex',
                    userSelect: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor:
                      selectedPeriod === period.title
                        ? theme.colors.mainDark
                        : theme.colors.white,
                  }}
                  onClick={() => setSelectedPeriod(period.title)}
                >
                  <text.T14
                    style={{
                      color:
                        selectedPeriod === period.title
                          ? theme.colors.white
                          : theme.colors.mainDark,
                    }}
                  >
                    {period.title}
                  </text.T14>
                </div>
              );
            })}
          </div>
          {/* Block 03 */}
          <div
            style={{
              flex: '1 1 calc(33.333% - 10px)',
              aspectRatio: '1/1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            {periods.slice(3, 6).map((period, index, array) => {
              return (
                <div
                  key={period.id}
                  title={period.title}
                  style={{
                    flex: '1 1 calc(33.333% - 10px)',
                    width: '100%',
                    border: `1px solid ${theme.colors.mainDark}`,
                    borderRadius: 6,
                    display: 'flex',
                    userSelect: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor:
                      selectedPeriod === period.title
                        ? theme.colors.mainDark
                        : theme.colors.white,
                  }}
                  onClick={() => setSelectedPeriod(period.title)}
                >
                  <text.T14
                    style={{
                      color:
                        selectedPeriod === period.title
                          ? theme.colors.white
                          : theme.colors.mainDark,
                    }}
                  >
                    {period.title}
                  </text.T14>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderAmount = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>Amount</text.T14>
        <custom.InputField
          placeholder='25 000.00'
          leftIcon={<svg.DollarSvg />}
        />
      </div>
    );
  };

  const renderCalculatedRepayment = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <text.T14 style={{marginBottom: 10}}>
          Calculated monthly repayment
        </text.T14>
        <custom.InputField
          placeholder='1 117.00'
          leftIcon={<svg.DollarSvg />}
        />
      </div>
    );
  };

  const renderEarlyLoanRepayment = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30, ...utils.rowCenterSpcBtw()}}>
        <text.H5>Early loan repayment</text.H5>
        <div
          style={{
            width: 41,
            backgroundColor: earlyLoanRepayment ? '#55ACEE' : 'lightgray',
            borderRadius: 12,
            padding: '1.5px 1.5px',
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: earlyLoanRepayment ? 'flex-end' : 'flex-start',
          }}
          onClick={() => setEarlyLoanRepayment(!earlyLoanRepayment)}
        >
          <div
            style={{
              width: 20.9,
              height: 20.9,
              backgroundColor: '#FFFFFF',
              borderRadius: 11,
              alignSelf: earlyLoanRepayment ? 'flex-end' : 'flex-start',
            }}
          />
        </div>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Open deposit'
        onClick={() => navigate(-1)}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52, marginBottom: 20}}
        className='container'
      >
        {renderCurrency()}
        {renderChooseLoanPeriod()}
        {renderAmount()}
        {renderCalculatedRepayment()}
        {renderEarlyLoanRepayment()}
        {renderButton()}
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
