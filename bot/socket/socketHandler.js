const { userService } = require("../services");

let io;

const initSocket = (serverIo) => {
    io = serverIo;
    io.on('connection', async (socket) => {
        console.log(`User ${socket.userId} connected with socketId: ${socket.id}`);
        
        socket.on('disconnect', async () => {
            try {
                const user = await userService.getUserByUserId(socket.userId);
                if (user) {
                    user.socketId = '';
                    await user.save();
                    console.log(`User ${socket.userId} disconnected`);
                } else {
                    console.warn(`User ${socket.userId} not found during disconnect`);
                }
            } catch (error) {
                console.error('Error during disconnect:', error);
            }
        });
    });
};

const getSocket = () => {
    if (!io) {
        throw new Error('Socket.IO chưa được khởi tạo!');
    }
    return io;
};

module.exports = {
    initSocket,
    getSocket,
};
