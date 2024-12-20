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

const currencies = [
{
    id: 1,
    title: 'USDT',
},
{
    id: 2,
    title: 'ETH',
},
];

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

const cards = [
{
    id: 1,
    cardUrl: 'https://george-fx.github.io/apitex_api/assets/cards/01.png',
    number: '**** **** **** 7895',
    balance: '4 863.27',
},
{
    id: 2,
    cardUrl: 'https://george-fx.github.io/apitex_api/assets/cards/02.png',
    number: '**** **** **** 5378',
    balance: '2 435.12',
},
];

export const Deposit: React.FC = () => {
    const {pathname} = useLocation();
    const navigate = hooks.useAppNavigate();
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [networks, setNetworks] = useState<string[]>([]);
    const [currency, setCurrency] = useState<string>("");
    const [network, setNetwork] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [error, setError] = useState<Boolean>(false);
    const webapp = useAppSelector(state => state.webappSlice.webApp);

    useEffect(() => {
        setTimeout(() => {
        window.scroll({top: -1, left: 0, behavior: 'smooth'});
        }, 10);
    }, [pathname]);

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
                console.log(data);
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
        setAmount(event.target.value);
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        if (currency && network && amount && Number(amount) >= 1){
            const body = webapp?.initDataUnsafe || {};
            console.log(JSON.stringify({initData: body}));
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
                console.log(data);
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
                            currencies.map((value, index)=> {
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

    const renderAmount = (): JSX.Element => {
        return (
            <div style={{marginBottom: 10}}>
                <text.T14 style={{marginBottom: 10}}>Amount</text.T14>
                <custom.InputField
                    placeholder='10'
                    name='amount'
                    value={amount}
                    onChange={handleChangeAmount}
                    type='number'
                    leftIcon={<svg.DollarSvg />}
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
            {renderCurrentDeposits()}
            {renderNetworkDeposits()}
            {renderAmount()}
            {error && renderError()}
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
