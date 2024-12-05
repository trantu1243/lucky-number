import {useState, FC, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {theme} from '../constants';
import {components} from '../components';

export const ConfirmationCode: FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();

  const [inputs, setInputs] = useState<string[]>(['', '', '', '', '']);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        goBack={true}
        title='Verify your phone number'
      />
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <text.T16
        style={{
          marginBottom: 24,
          color: theme.colors.textColor,
          paddingRight: 20,
        }}
      >
        Enter your OTP code here.
      </text.T16>
    );
  };

  const renderInputFields = (): JSX.Element => {
    return (
      <div style={{...utils.rowCenterSpcBtw(), marginBottom: 30}}>
        {inputs.map((input, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              width: '17%',
              aspectRatio: 1 / 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              border: '1px solid #FFEFE6',
              backgroundColor: theme.colors.white,
            }}
          >
            <input
              maxLength={1}
              style={{
                textAlign: 'center',
                width: '100%',
                height: '100%',
                ...theme.fonts.SourceSansPro_400Regular,
                borderRadius: 600 / 2,
                border: 'none',
                backgroundColor: theme.colors.transparent,
                fontSize: 20,
                color: theme.colors.mainDark,
              }}
              type='number'
              min={0}
              max={9}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderIfDidNotReceiveCode = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30, ...utils.rowCenter()}}>
        <text.T16 style={{marginRight: 5}}>
          Didn’t receive the OTP?{' '}
          <button
            style={{
              fontSize: 16,
              cursor: 'pointer',
              color: theme.colors.mainColor,
            }}
          >
            Resend.
          </button>
        </text.T16>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='verify'
        containerStyle={{marginBottom: 20}}
        onClick={() => {
          navigate('/SignUpAccountCreated');
        }}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{flexGrow: 1, padding: 20, marginTop: 52}}>
        {renderDescription()}
        {renderInputFields()}
        {renderIfDidNotReceiveCode()}
        {renderButton()}
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
