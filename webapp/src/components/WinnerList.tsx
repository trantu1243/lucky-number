import React, { useEffect } from 'react';
import './css/winner-list.css'
import {text} from '../text';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';

type Props = {
  viewAllVisible?: boolean;
  rightIcon?: React.ReactNode;
  viewAllOnClick?: () => void;
  rightIconOnClick?: () => void;
  containerStyle?: React.CSSProperties;
};

export const WinnerList: React.FC<Props> = ({
    rightIcon,
    viewAllOnClick,
    containerStyle,
    rightIconOnClick,
    viewAllVisible = true,
}) => {
    const winners = [
        { id: 1, name: "Nguyen Van A", game: "Lucky number", amount: 500000 },
        { id: 2, name: "Tran Thi B", game: "Lucky number", amount: 300000 },
        { id: 3, name: "Le Van C", game: "Lucky number", amount: 700000 },
        { id: 4, name: "Nguyen Van A", game: "Lucky number", amount: 500000 },
        { id: 5, name: "Tran Thi B", game: "Lucky number", amount: 300000 },
        { id: 6, name: "Le Van C", game: "Lucky number", amount: 700000 },
        { id: 7, name: "Nguyen Van A", game: "Lucky number", amount: 500000 },
        { id: 8, name: "Tran Thi B", game: "Lucky number", amount: 300000 },
        { id: 9, name: "Le Van C", game: "Lucky number", amount: 700000 },
        { id: 10, name: "Nguyen Van A", game: "Lucky number", amount: 500000 },
        { id: 11, name: "Nguyen Van A", game: "Lucky number", amount: 500000 },
        { id: 12, name: "Tran Thi B", game: "Lucky number", amount: 300000 },
        { id: 13, name: "Le Van C", game: "Lucky number", amount: 700000 },
        { id: 14, name: "Nguyen Van A", game: "Lucky number", amount: 500000 },
        { id: 15, name: "Tran Thi B", game: "Lucky number", amount: 300000 },
        { id: 16, name: "Le Van C", game: "Lucky number", amount: 700000 },
        { id: 17, name: "Nguyen Van A", game: "Lucky number", amount: 500000 },
        { id: 18, name: "Tran Thi B", game: "Lucky number", amount: 300000 },
        { id: 19, name: "Le Van C", game: "Lucky number", amount: 700000 },
        { id: 20, name: "Nguyen Van A", game: "Lucky number", amount: 500000 },
    ];

    useEffect(() => {
        const lists = document.querySelectorAll('.winner-list');
        let activeIndex = 0;
    
        function switchList() {
            if (lists.length > 0) {
                lists[activeIndex].classList.remove('active');
                activeIndex = (activeIndex + 1) % lists.length;
                lists[activeIndex].classList.add('active');
            }
        }
    
        const intervalId = setInterval(switchList, 1000);
    
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    
        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return (
        <div className="list-wrap">
            <div className="winner-list-wrap">
                <div className="title">
                    <div className="icon">
                        <img alt="" width={19} src="/images/lhc.png" style={{marginRight: 2}} />
                    </div>
                <div className="text">List of Winners</div>
                </div>
                <div className="winner-list">
                {[1, 2].map((_, index) => (
                    <ul key={index} className="inner-wrap">
                    {winners.map((item) => (
                        <li key={item.id} className="winner-item">
                        <div className="left">
                            <div className="name" style={{marginBottom: '0.1rem'}}>{item.name}</div>
                            <div className="account">
                            Game: {item.game}
                            </div>
                        </div>
                        <div className="right" style={{color: theme.colors.green}}>
                            <span>+</span>
                            <span>{item.amount.toLocaleString()}</span> USDT
                        </div>
                        </li>
                    ))}
                    </ul>
                ))}
                </div>
            </div>
        </div>

    );
};
