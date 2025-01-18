const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

const saveVerificationCode = (email, code) => {
    return new Promise((resolve, reject) => {
        client.setEx(email, 900, code, (err, reply) => {
            if (err) return reject(err);
            resolve(reply);
        });
    });
};

const verifyCode = (email, code) => {
    return new Promise((resolve, reject) => {
        client.get(email, (err, storedCode) => {
            if (err) return reject(err);
            resolve(storedCode === code.toString());
        });
    });
};

const deleteVerificationCode = (email) => {
    return new Promise((resolve, reject) => {
        client.del(email, (err, reply) => {
            if (err) return reject(err);
            resolve(reply);
        });
    });
};

module.exports = {
    saveVerificationCode,
    verifyCode,
    deleteVerificationCode
}
