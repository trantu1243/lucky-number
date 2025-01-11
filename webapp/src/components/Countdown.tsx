import React, { useEffect, useState } from 'react';
import { theme } from '../constants';

interface CountdownProps {
    expiredAt: number; // UNIX timestamp in seconds
    handle?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ expiredAt, handle }) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        const targetTime = expiredAt * 1000;

        const updateCountdown = () => {
            const currentTime = Date.now();
            const difference = targetTime - currentTime;
            setTimeLeft(Math.max(0, difference));

            if (handle && (difference === 0)) handle();
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [expiredAt, handle]);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    return (
        <div style={{
            color: theme.colors.whiteText,
            textAlign: 'center',
            ...theme.fonts.SourceSansPro_400Regular,
        }}>
            {minutes}:{String(seconds).padStart(2, '0')}
        </div>
    );
};

export default Countdown;
