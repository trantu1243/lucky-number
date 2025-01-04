const crypto = require('crypto');
const { userService } = require('../services');

const verifyDataIntegrity = (initDataUnsafe, hash, token) => {
    const dataCheckString = Object.entries(initDataUnsafe).sort().map(([k, v]) => {
        if (typeof v === "object" && v !== null) {
            v = JSON.stringify(v);
        }

        if (typeof v === "string" && /(https?:\/\/[^\s]+)/.test(v)) {
            v = v.replace(/\//g, "\\/");
        }
        
        return `${k}=${v}`;
    }).join("\n");

    const secret = crypto.createHmac("sha256", "WebAppData").update(token);
    const calculatedHash = crypto.createHmac("sha256", secret.digest()).update(dataCheckString).digest("hex");
    
    return calculatedHash === hash;
};

const verifySocketConnection = async (socket, next) => {
    const { initDataUnsafe } = socket.handshake.query;

    const initData = JSON.parse(initDataUnsafe);
    const botToken = process.env.BOT_TOKEN; 

    if (!initData || !botToken) {
        console.log("Invalid data or bot token")
        return next(new Error("Invalid data or bot token"));
    }

    const { hash, ...rest } = initData;

    if (!verifyDataIntegrity(rest, hash, botToken)) {
        console.log("Invalid data signature");
        return next(new Error("Invalid data signature"));
    }

    const authDate = Number(rest.auth_date);
    const currentTime = Math.floor(Date.now() / 1000);
    const MAX_AGE = 86400;

    if (currentTime - authDate > MAX_AGE) {
        console.log("Data is outdated")
        return next(new Error("Data is outdated"));
    }

    socket.userId = rest.user.id; 

    const user = await userService.getUserByUserId(rest.user.id);
    if (!user) {
        console.log('User not found')
        return next(new Error('User not found'));
    }

    user.socketId = socket.id;
    await user.save();
    next(); 
};

module.exports = verifySocketConnection;