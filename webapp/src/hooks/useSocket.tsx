import { useEffect, useMemo } from 'react';
import { closeSocket, getSocket } from '../services/socketService';
import { useAppSelector } from '.';

const useSocket = () => {
    const webapp = useAppSelector((state) => state.webappSlice.webApp);
    const initData = useMemo(() => webapp?.initDataUnsafe || null, [webapp]);

    useEffect(() => {
        const socket = getSocket(initData);

        return () => {
            closeSocket();
        };
    }, [initData]);

    return getSocket(initData);
};

export default useSocket;
