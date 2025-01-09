import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'https://api.lucky-number.net';

let socket: Socket | null = null;

export const getSocket = (initData: any): Socket => {
    if (!socket) {
        socket = io(SERVER_URL, {
            query: {
                initDataUnsafe: JSON.stringify(initData),
            },
        });
    }
    return socket;
};

export const closeSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export default socket;
