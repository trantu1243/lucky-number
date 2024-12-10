import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

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

    const [selectedPeriod, setSelectedPeriod] = useState<string>(
        periods[2].title,
    );
    const [selectedCard, setSelectedCard] = useState<number>(cards[0].id);
    const [earlyWithdrawal, setEarlyWithdrawal] = useState<boolean>(false);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

    useEffect(() => {
        setTimeout(() => {
        window.scroll({top: -1, left: 0, behavior: 'smooth'});
        }, 10);
    }, [pathname]);

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
                        <option value="usd">USD</option>
                        <option value="usd">EUR</option>
                        <option value="usd">GBP</option>
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
                        name="currency"
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
                        <option value="usd">USD</option>
                        <option value="usd">EUR</option>
                        <option value="usd">GBP</option>
                    </select>
                </div>
            </div>
        );
    };


    const renderAmount = (): JSX.Element => {
        return (
            <div style={{marginBottom: 30}}>
                <text.T14 style={{marginBottom: 10}}>Amount</text.T14>
                <custom.InputField
                    placeholder='1 000.00'
                    leftIcon={<svg.DollarSvg />}
                />
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
            style={{marginTop: 52, marginBottom: 60}}
            className='container'
        >
            {renderCurrentDeposits()}
            {renderNetworkDeposits()}
            {renderAmount()}
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
