import React, {useState, useEffect, useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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

interface USDT {
    network: string;
    currency: string;
    is_avaible: boolean;
    limit: {
        min_amount: string;
        max_amount: string;
    };
    commission: { 
        fee_amount: string; 
        percent: string;
    }
}

export const Withdraw: React.FC = () => {
    const {pathname} = useLocation();
    const navigate = hooks.useAppNavigate();
    const [currency, setCurrency] = useState<string>("");
    const [network, setNetwork] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const webapp = useAppSelector(state => state.webappSlice.webApp);
    const [loading, setLoading] = useState(true);
    const [payoutAddress, setPayoutAddress] = useState<PayoutAddress[]>([]);
    const [usdt, setUsdt] = useState<USDT[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [receive, setReceive] = useState<string>('');
    const [expiredAt, setExpriredAt] = useState<number>(Math.floor(Date.now() / 1000) + 15 * 60); 

    useEffect(() => {
        setTimeout(() => {
        window.scroll({top: -1, left: 0, behavior: 'smooth'});
        }, 10);
    }, [pathname]);

    const getPayoutAddress = useCallback(async () => {
        const url = `https://api.lucky-number.net/v1/payout/get-payout-address`;
        const body = webapp?.initDataUnsafe || {};
        setLoading(false);
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

    const getPayoutService = useCallback(async () => {
        const url = `https://api.lucky-number.net/v1/payout/payout-service`;
        const body = webapp?.initDataUnsafe || {};
        setLoading(false);
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
                console.log(data)
                setUsdt(data);
                setExpriredAt(Math.floor(Date.now() / 1000) + 15 * 60);
            })
            .catch((error) => console.error(error));
    }, [webapp]);
    
    useEffect(() => {
        getPayoutAddress();
        getPayoutService();
    }, [getPayoutAddress, getPayoutService]);

    useEffect(() => {
        if (amount && network && currency) {
            const exchange: USDT = usdt.filter(item => item.currency === currency && item.network === network)[0];
            if (Number(amount) < Number(exchange.limit.min_amount + 1) || Number(amount) > Number(exchange.limit.max_amount) || Number(amount) < 5) {
                setError(true);
                setErrorMsg(`Please enter correctly. Amount must be at least 5 (11 with ETH network) and the maximum amount is ${String(Math.floor(Number(exchange.limit.max_amount)))}.`)
            } else setError(false);
            setReceive(String(Number(amount) - Number(exchange.commission.fee_amount) - 0.5));
        }
    }, [amount, currency, network, usdt]);

    function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value.replace(/^0+/, "");
        if (/^\d*$/.test(value)) {
            setAmount(value);
        }   
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        setLoading(true);
        event.preventDefault();
        if (currency && network && amount && Number(amount) >= 2){
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
                toast.success('We are processing your request, please kindly wait a moment.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "dark",
                });
                setTimeout(() => {
                    navigate('/TabNavigator');
                }, 3000);
                
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "dark",
                });
                setError(true);
                setErrorMsg('Error.')
                setLoading(false);
            });
        } else {
            setError(true);
            setErrorMsg('Please enter correctly.')
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
            <div style={{marginBottom: 10}}>
                <text.T14 
                    style={{
                        marginBottom: 10,
                        display: 'inline-block',
                        marginRight: 10
                    }}>
                        Select payout address
                </text.T14>
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
                    containerStyle={{
                        display: 'inline-block'
                    }}
                />
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
                
            </div>
        );
    };

    const renderCommission = (): JSX.Element => {
        return (
            <div
                style={{
                    padding: 10,
                    borderRadius: 10,
                    border: '1px solid gray',
                    marginBottom: 10,
                    backgroundColor: theme.colors.white,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <text.T14
                        style={{
                            color: 'gray'
                        }}
                    >
                        Recipient gets
                    </text.T14>
                    <text.T14
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        {receive} USDT
                    </text.T14>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <text.T14
                        style={{
                            color: 'gray'
                        }}
                    >
                        From your balance
                    </text.T14>
                    <text.T14
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        {amount} Chip
                    </text.T14>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <text.T14
                        style={{
                            color: 'gray'
                        }}
                    >
                        Commission
                    </text.T14>
                    <text.T14
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        {String(Math.round((Number(amount) - Number(receive)) * 100) / 100)} USDT
                    </text.T14>
                </div>
                <div style={{
                    borderTop: '1px solid gray',
                    margin: '10px 0'
                }}></div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <text.T14
                        style={{
                            
                        }}
                    >
                        The commission is valid for
                    </text.T14>
                    <components.Countdown expiredAt={expiredAt} handle={() => {getPayoutService()}}/>
                </div>
            </div>
          
        )
    }

    const renderError = (): JSX.Element => {
        return (
            <text.T14 style={{
                color: theme.colors.red,
                fontStyle: 'italic'
            }}>* {errorMsg}</text.T14>
        )
    }

    const renderButton = (): JSX.Element => {
        return (
            <components.Button
                title='Withdraw'
                onClick={handleClick}
                style={{
                    marginTop: 20
                }}
                disabled={error}
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
            {amount && network && currency && renderCommission()}
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
             <ToastContainer />
        </div>
    );
};
