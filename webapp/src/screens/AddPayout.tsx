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

export interface PayoutAddress {
    currency: string;
    network: string;
    address: string;
}

export const AddPayout: React.FC = () => {
    const {pathname} = useLocation();
    const navigate = hooks.useAppNavigate();
    const [currency, setCurrency] = useState<string>("");
    const [network, setNetwork] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [error, setError] = useState<Boolean>(false);
    const webapp = useAppSelector(state => state.webappSlice.webApp);
    const [loading, setLoading] = useState<Boolean>(true);
    const [payoutAddress, setPayoutAddress] = useState<PayoutAddress[]>([
        {
            currency: 'USDT',
            network: 'TRON',
            address: 'fsadfasfasfasasdfafasdfasdfdffasdf'
        }
    ]);

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

    useEffect(() => {
        setTimeout(() => {
        window.scroll({top: -1, left: 0, behavior: 'smooth'});
        }, 10);
    }, [pathname]);

    function handleChangeCurrency(event: React.ChangeEvent<HTMLSelectElement>){
        setCurrency(event.target.value);
    }

    function handleChangeNetwork(event: React.ChangeEvent<HTMLSelectElement>){
        setNetwork(event.target.value);
    }

    function handleChangeAddress(event: React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        setAddress(value);
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        setLoading(true);
        if (currency && network && address){
            const body = webapp?.initDataUnsafe || {};
            const url = `https://api.lucky-number.net/v1/payout/add-payout`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initData: body,
                    currency,
                    network,
                    address
                })
            })
            .then((response) => response.json())
            .then((data) => {
                getPayoutAddress()
                setLoading(false);
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

    function handleDelete(event: React.MouseEvent<SVGSVGElement, MouseEvent>, addressToDelete: string){
        event.preventDefault();
        setLoading(true);
        
        const body = webapp?.initDataUnsafe || {};
        const url = `https://api.lucky-number.net/v1/payout/delete-payout-address`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                initData: body,
                address: addressToDelete
            })
        })
        .then((response) => response.json())
        .then((data) => {
            getPayoutAddress();
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setError(true);
            setLoading(false);

        });
   
    }

    const renderHeader = (): JSX.Element => {
        return (
        <components.Header
            title='Open deposit'
            goBack={true}
        />
        );
    };

    const sortedCurrencies = ['USDT'];

    const renderUseCard = (): JSX.Element => {
        return (
            <div style={{marginBottom: 30}}>
                <text.T14 style={{marginBottom: 10}}>Payout address</text.T14>
                {payoutAddress.map((card, index, array) => {
                    const isLast = index === array.length - 1;
                    const net = card.network === "TRON" ? "TRON(TRC20)" : card.network;
                    return (
                        <div
                        style={{
                            border: '1px solid #FFEFE6',
                            padding: 12,
                            borderRadius: 10,
                            cursor: 'pointer',
                            userSelect: 'none',
                            marginBottom: isLast ? 0 : 10,
                            ...utils.rowCenter({gap: 12}),
                            backgroundColor: theme.colors.white,
                        }}
                        key={index}
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
                            <svg
                                width="18px" 
                                height="18px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    cursor: 'pointer',
                                    fill: 'red', 
                                    marginLeft: 'auto'
                                }}
                                onClick={(e) => {handleDelete(e, card.address)}}
                            >
                                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z" />
                            </svg>
                        </div>
                    );
                })}
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
                        <option value="TRON">TRON (TRC20)</option>
                        <option value="ETH">ETH (ERC20)</option>
                        <option value="BSC">BSC (BEP20)</option>
                        <option value="TON">TON</option>
                    </select>
                </div>
            </div>
        );
    };

    const renderAddress = (): JSX.Element => {
        return (
            <div style={{marginBottom: 10}}>
                <text.T14 style={{marginBottom: 10}}>Address to payout</text.T14>
                <custom.InputField
                    placeholder='Enter your address'
                    name='address'
                    value={address}
                    onChange={handleChangeAddress}
                    type='text'
                    leftIcon={<svg.EditSvg />}
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
            title='Add'
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
            {payoutAddress.length > 0 && renderUseCard()}
            {renderCurrentDeposits()}
            {renderNetworkDeposits()}
            {renderAddress()}
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
