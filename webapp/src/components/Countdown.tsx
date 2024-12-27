import React, { useEffect, useState } from 'react';
import { theme } from '../constants';

interface CountdownProps {
    expiredAt: number; // UNIX timestamp
}

const Countdown: React.FC<CountdownProps> = ({ expiredAt }) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        const targetTime = expiredAt * 1000;

        const updateCountdown = () => {
            const currentTime = Date.now();
            const difference = Math.max(0, targetTime - currentTime);
            setTimeLeft(difference);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [expiredAt]);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    return (
        <div style={{
            color: theme.colors.whiteText,
            textAlign: 'center',
            ...theme.fonts.SourceSansPro_400Regular,
        }}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Countdown;
