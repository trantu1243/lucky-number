import React from 'react';

import {text} from '../../text';
import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {svg} from '../../assets/svg';
import {components} from '../../components';

const menu = [
    {
        id: 1,
        img: '/images/Home/1-lucky-number-game-min.png',
        url: '/lucky-number',
    },
    {
        id: 2,
        img: '/images/Home/2-even-odd-game-min.png',
        url: '/lucky-number',
    },
    {
        id: 3,
        img: '/images/Home/3-over-under-game-min.png',
        url: '/lucky-number',
    },
    {
        id: 4,
        img: '/images/Home/4-lucky-lottery-min.png',
        url: '/lucky-number',
    },
    {
        id: 5,
        img: '/images/Home/5-poke-play-game-min.png',
        url: '/lucky-number',
    }
];

export const Games: React.FC = () => {
    const navigate = hooks.useAppNavigate();

    const renderHeader = (): JSX.Element => {
        return (
          <components.Header
            user={true}
            creditCard={true}
          />
        );
    };

    const renderBottomTabBar = () => {
        return <components.BottomTabBar />;
    };

    const renderContent = (): JSX.Element => {
        return (
        <main
            style={{marginTop: 20, paddingBottom: 100}}
            className='container'
        >
            <text.H2 style={{marginBottom: 20}}>Games</text.H2>
            <div
            style={{
                width: '100%',
                ...utils.rowCenter({gap: 11, wrap: true}),
            }}
            >
            {menu.map((item, index, array) => {
                return (
                <div
                    key={item.id}
                    style={{
                        borderRadius: 10,
                        cursor: 'pointer',
                        userSelect: 'none',
                        ...utils.rowCenter({gap: 10}),
                    }}
                    onClick={() => navigate(item.url)}
                >
                    <img alt='' src={item.img} style={{width: '100%'}}/>
                </div>
                );
            })}
            </div>
        </main>
        );
    };

    return (
        <div id='screen'>
            {renderContent()}
            {renderBottomTabBar()}
        </div>
    );
};
