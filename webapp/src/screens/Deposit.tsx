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

const networkDescription : { [key: string]: string } = {
    TRON: 'TRC20',
    ETH: 'ERC20',
    BSC: 'BEP20',
    BTC: 'Bitcoin',
    LTC: 'Litecoin',
    SOL: 'Solana',
    ADA: 'Cardano',
    DOT: 'Polkadot',
    ATOM: 'Cosmos',
    XMR: 'Monero',
    DOGE: 'Dogecoin',
    XRP: 'Ripple',
    ALGO: 'Algorand',
    NEAR: 'Near Protocol'
};

const preferredCurrencies = ['USDT', 'ETH', 'BTC', 'TON'];

export const Deposit: React.FC = () => {
    const {pathname} = useLocation();
    const navigate = hooks.useAppNavigate();
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [networks, setNetworks] = useState<string[]>([]);
    const [currency, setCurrency] = useState<string>("");
    const [network, setNetwork] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [error, setError] = useState<Boolean>(false);
    const [estimate, setEstimate] = useState<Number>(0);
    const webapp = useAppSelector(state => state.webappSlice.webApp);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
        window.scroll({top: -1, left: 0, behavior: 'smooth'});
        }, 10);
    }, [pathname]);

    const checkPayment = useCallback(async () => {
        setLoading(true);
        const body = webapp?.initDataUnsafe || {};
        const urlWithParams = `https://api.lucky-number.net/v1/payment/check`;
    
        fetch(urlWithParams, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({initData: body})
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    navigate("/payment/qrcode");
                }
                if (data.msg === "email") {
                    navigate("/add-email");
                }
                setLoading(false);
            })
            .catch((error) => console.error(error));
    
    }, [webapp, navigate]);

    useEffect(() => {
        checkPayment();
    }, [checkPayment])

    const getAllCurrencies = useCallback(async () => {

        const url = `https://api.lucky-number.net/v1/payment-service/currencies`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
                setCurrencies(data);
            })
            .catch((error) => console.error(error));

    }, []);

    const getNetworks = useCallback(async () => {
        if (!currency) return
        const url = `https://api.lucky-number.net/v1/payment-service/networks/${currency}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
          })
            .then((response) => response.json())
            .then((data) => {
                setNetworks(data);
                setNetwork('');
            })
            .catch((error) => console.error(error));

    }, [currency]);

    useEffect(()=>{
        getAllCurrencies();
    }, [getAllCurrencies]);

    useEffect(()=>{
        getNetworks();
    }, [currency, getNetworks]);

    function handleChangeCurrency(event: React.ChangeEvent<HTMLSelectElement>){
        setCurrency(event.target.value);
    }

    function handleChangeNetwork(event: React.ChangeEvent<HTMLSelectElement>){
        setNetwork(event.target.value);
    }

    function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value.replace(/^0+/, "");
        if (/^\d*$/.test(value)) {
            setAmount(value);
        }   
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        setLoading(true);
        if (currency && network && amount && Number(amount) >= 5){
            const body = webapp?.initDataUnsafe || {};
            const url = `https://api.lucky-number.net/v1/payment/create-payment`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initData: body,
                    currency,
                    network,
                    amount
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    navigate('/payment/qrcode');
                } else {
                    toast.error('You can only make a deposit once every 5 minutes.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "dark",
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                setError(true);
                setLoading(false);
            });
        } else {
            setError(true);
        }
    }

    const getExchangeRate = useCallback(async () => {
        if (currency && network && amount) {
            const url = `https://api.lucky-number.net/v1/payment/get-exchange-rate`;
            const body = webapp?.initDataUnsafe || {};
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initData: body,
                    currency,
                    network,
                    amount
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.status) {
                        setEstimate(Number(data.estimate));
                    }
                })
                .catch((error) => console.error(error));
        }
        
    }, [webapp, amount, currency, network]);

    useEffect(() => {
        getExchangeRate()
    }, [getExchangeRate, amount, currency, network]);

    const renderHeader = (): JSX.Element => {
        return (
        <components.Header
            title='Open deposit'
            goBack={true}
        />
        );
    };

    const sortedCurrencies = [
        ...preferredCurrencies,
        ...currencies.filter(currency => !preferredCurrencies.includes(currency)),
    ];

    const renderDescription = (): JSX.Element => {
        return (
            <div style={{...utils.rowCenterSpcBtw(), marginBottom: 20}}>
                <text.T14>≈ {String(estimate)} {currency}</text.T14>
            </div>
        );
    };

    const renderAmount = (): JSX.Element => {
        return (
            <div style={{marginBottom: 10}}>
                <text.T14 style={{marginBottom: 10}}>Chip to deposit (1 chip = 1 USDT)</text.T14>
                <custom.InputField
                    placeholder='Min 5 Chip'
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

    const renderCurrentDeposits = (): JSX.Element => {
        return (
            <div style={{marginBottom: 10}}>
                <text.T14 style={{marginBottom: 10}}>Currency</text.T14>
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
                    <div style={{marginRight: 14}}>{<svg.CalendarSvg />}</div>
                    <select
                        name="currency"
                        value={currency}
                        onChange={handleChangeCurrency}
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
                    >
                        <option value="">--Select currency--</option>
                        {
                            sortedCurrencies.map((value, index)=> {
                                return <option key={index} value={value}>{value}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        );
    };

    const renderNetworkDeposits = (): JSX.Element => {
        return (
            <div style={{marginBottom: 10}}>
                <text.T14 style={{marginBottom: 10}}>Network</text.T14>
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
                    <div style={{marginRight: 14}}>{<svg.CalendarSvg />}</div>
                    <select
                        name="network"
                        value={network}
                        onChange={handleChangeNetwork}
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
                    >
                        <option value="">--Select network--</option>
                        {
                            networks.map((value, index)=> {
                                const description = networkDescription[value] ? ` (${networkDescription[value]})` : '';
                                return <option key={index} value={value}>{value + description}</option>;
                            })
                        }
                    </select>
                </div>
            </div>
        );
    };

    const renderError = (): JSX.Element => {
        return (
            <text.T14 style={{
                color: theme.colors.red,
                fontStyle: 'italic'
            }}>* Please enter correctly. Amount must be at least 5.</text.T14>
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
            {renderCurrentDeposits()}
            {renderNetworkDeposits()}
            {estimate && currency && renderDescription()}
            {error && renderError()}
            {renderButton()}
            <ToastContainer />
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
