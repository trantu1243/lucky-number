import React, {useState, useEffect, useCallback} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import { useAppSelector } from '../store';
import "../assets/css/loading.css";
import { PayoutAddress } from './AddPayout';

export const Withdraw: React.FC = () => {
    const {pathname} = useLocation();
    const navigate = hooks.useAppNavigate();
    const [currency, setCurrency] = useState<string>("");
    const [network, setNetwork] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [error, setError] = useState<Boolean>(false);
    const webapp = useAppSelector(state => state.webappSlice.webApp);
    const [loading, setLoading] = useState(true);
    const [payoutAddress, setPayoutAddress] = useState<PayoutAddress[]>([]);

    useEffect(() => {
        setTimeout(() => {
        window.scroll({top: -1, left: 0, behavior: 'smooth'});
        }, 10);
    }, [pathname]);

    const getPayoutAddress = useCallback(async () => {
        const url = `https://api.lucky-number.net/v1/payout/get-payout-address`;
        const body = webapp?.initDataUnsafe || {};
        setLoading(true);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                initData: body,
            })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) setPayoutAddress(data.result);
                setLoading(false);
            })
            .catch((error) => console.error(error));

    }, [webapp]);
    
    useEffect(()=>{
        getPayoutAddress();
    }, [getPayoutAddress]);

    function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value.replace(/^0+/, "");
        if (/^\d*$/.test(value)) {
            setAmount(value);
        }   
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        if (currency && network && amount && Number(amount) >= 10){
            const body = webapp?.initDataUnsafe || {};
            const url = `https://api.lucky-number.net/v1/payout/create-payout`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initData: body,
                    currency,
                    network,
                    amount,
                    address
                })
            })
            .then((response) => response.json())
            .then((data) => {
                navigate('/payment/qrcode');
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            });
        } else {
            setError(true);
        }
    }

    const renderHeader = (): JSX.Element => {
        return (
        <components.Header
            title='Open deposit'
            goBack={true}
        />
        );
    };

    const renderAmount = (): JSX.Element => {
        return (
            <div style={{marginBottom: 10}}>
                <text.T14 style={{marginBottom: 10}}>Chips to payout (1 chip = 1 USDT)</text.T14>
                <custom.InputField
                    placeholder='0'
                    name='amount'
                    value={amount}
                    onChange={handleChangeAmount}
                    inputMode="numeric"
                    type='number'
                    leftIcon={<svg.DollarSvg />}
                />
            </div>
        );
    };

    const renderUseCard = (): JSX.Element => {
        return (
            <div style={{marginBottom: 30}}>
                <text.T14 style={{marginBottom: 10}}>Select payout address</text.T14>
                {payoutAddress.map((card, index, array) => {
                    const isLast = index === array.length - 1;
                    const net = card.network === "TRON" ? "TRON(TRC20)" : card.network;

                    return (
                        <div
                            style={{
                                border:
                                address === card.address
                                    ? `1px solid ${theme.colors.mainColor}`
                                    : '1px solid #FFEFE6',
                                padding: 12,
                                borderRadius: 10,
                                cursor: 'pointer',
                                userSelect: 'none',
                                marginBottom: isLast ? 0 : 10,
                                ...utils.rowCenter({gap: 12}),
                                backgroundColor: theme.colors.white,
                            }}
                            key={index}
                            onClick={() => {setAddress(card.address); setCurrency(card.currency); setNetwork(card.network)}}
                        >
                            <svg.CardMenuSvg />
                            <div>
                                <div
                                    style={{
                                        fontSize: 12,
                                        lineHeight: 1.6,
                                        color: theme.colors.bodyTextColor,
                                        ...theme.fonts.SourceSansPro_400Regular,
                                    }}
                                >
                                    {card.address.replace(/^(.{5}).+(.{5})$/, '$1*****$2')}
                                </div>
                                <text.H6>{card.currency} {net}</text.H6>
                            </div>
                        </div>
                    );
                })}
                <components.Button
                    title='+'
                    onClick={() => {navigate('/add-payout')}}
                    style={{
                        width: 30,
                        height:30,
                        borderRadius: 0,
                        fontSize: 18,
                        marginTop: 5
                    }}
                />
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
                title='Open deposit'
                onClick={handleClick}
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
            {renderAmount()}
            {renderUseCard()}
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
