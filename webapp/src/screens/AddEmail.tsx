import React, {useState, useEffect, useCallback} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import { useAppSelector } from '../store';
import "../assets/css/loading.css";

export interface PayoutAddress {
    currency: string;
    network: string;
    address: string;
}

export const AddEmail: React.FC = () => {
    const {pathname} = useLocation();
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<Boolean>(false);
    const webapp = useAppSelector(state => state.webappSlice.webApp);
    const [loading, setLoading] = useState<Boolean>(false);

    useEffect(() => {
        setTimeout(() => {
        window.scroll({top: -1, left: 0, behavior: 'smooth'});
        }, 10);
    }, [pathname]);

    const sendVerificationCode = async () => {
        const url = `https://api.lucky-number.net/v1/user/send-code`;
        const body = webapp?.initDataUnsafe || {};
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initData: body,
                    email
                })
                })
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('Failed to send verification code');
                    }
                    return response.json()}
                )
                .then((data) => {
                    
                })
                .catch((error) => {
                    setError(true);
                    return false;
                });
                
            return true;
        } catch (error) {
            setError(true);
            return false;
        }
    };

    function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    function handleChangeCode(event: React.ChangeEvent<HTMLInputElement>){
        if (isSending) setCode(event.target.value);
    }
    
    const renderHeader = (): JSX.Element => {
        return (
        <components.Header
            title='Open deposit'
            goBack={true}
        />
        );
    };

    const renderEmail = (): JSX.Element => {
        return (
            <div style={{marginBottom: 10}}>
                <text.T14 style={{marginBottom: 10}}>Email</text.T14>
                <custom.InputField
                    placeholder='Enter your email'
                    name='email'
                    value={email}
                    type='text'
                    onChange={handleChangeEmail}
                    leftIcon={<svg.EditSvg />}
                />
            </div>
        );
    };

    const [countdown, setCountdown] = useState<number>(60); 
    const [isSending, setIsSending] = useState<boolean>(false);

    const startCountdown = async () => {
        await sendVerificationCode();
        setIsSending(true);
        setCountdown(60);

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval); 
                    setIsSending(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const renderCode = (): JSX.Element => {
        return (
            <div style={{marginBottom: 10, marginTop: 10}}>
                <text.T14 style={{marginBottom: 10}}>Verification code</text.T14>
                <div
                    style={{
                        height: 50,
                        paddingLeft: 10,
                        paddingRight: 20,
                        position: 'relative',
                        border: '1px solid #FFEFE6',
                        backgroundColor: theme.colors.main2Dark,
                        borderRadius: 10,
                        ...utils.rowCenter(),
                    }}
                >
                    <input
                        className='input-field'
                        maxLength={50}
                        type='text'
                        placeholder='Enter your code'
                        name='code'
                        value={code}
                        inputMode='numeric'
                        onChange={handleChangeCode}
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: 0,
                            margin: 0,
                            border: 'none',
                            outline: 'none',
                            backgroundColor: theme.colors.main2Dark,
                            fontSize: 16,
                            color: theme.colors.whiteText,
                            ...theme.fonts.SourceSansPro_400Regular,
                        }}
                    />
                     <button
                        onClick={startCountdown}
                        disabled={isSending}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            padding: '5px 10px',
                            backgroundColor: isSending ? '#d9645d' : theme.colors.mainColor,
                            color: theme.colors.whiteText,
                            border: 'none',
                            borderRadius: 5,
                            fontSize: 12,
                            cursor: isSending ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {isSending ? `${countdown}s` : 'Send Code'}
                    </button>
                </div>
            </div>
        );
    };

    const renderError = (): JSX.Element => {
        return (
            <text.T14 style={{
                color: theme.colors.red,
                fontStyle: 'italic'
            }}>* Please enter correctly. Amount must be at least 1.</text.T14>
        )
    }

    const renderButton = (): JSX.Element => {
        return (
        <components.Button
            title='Add'
            style={{
                marginTop: 20
            }}
        />
        );
    };

    const renderContent = (): JSX.Element => {
        return (
        <main
            style={{marginTop: 52, marginBottom: 60}}
            className='container'
        >
            {renderEmail()}
            {renderCode()}
            {error && renderError()}
            {renderButton()}
        </main>
        );
    };

    return (
        <div id='screen'>
            {renderHeader()}
            {loading ? (
                <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        height: '100vh'   
                    }}
                >
                    <span className="loader"></span>
                </div>
            ) : (     
                <>
                    {renderContent()}
                </>
            )}
        </div>
    );
};
