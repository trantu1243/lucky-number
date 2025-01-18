const { userService } = require("../services")

const getUserInfo = async (req, res) => {
    console.log(req.body);
    const { usd, experience, level, charged, amountDeposited, invitation, payment_time, payout_time, createdAt, updatedAt } = await userService.getUserByUserId(req.userId);
    if (usd) res.send({ usd, experience, level, charged, amountDeposited, invitation, payment_time, payout_time, createdAt, updatedAt });
    else res.status(404);
}

const sendCode = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        const verificationCode = Math.floor(10000000 + Math.random() * 90000000);
        await redisService.saveVerificationCode(email, verificationCode);

        await emailService.sendVerificationEmail(email, verificationCode);
        res.status(200).json({ message: 'Verification email sent!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send verification email', error: error.message });
    }
}

const verifyCode = async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
        const isValid = await redisService.verifyCode(email, verificationCode);
        if (isValid) {
            const user = await userService.getUserByUserId(req.userId);
            user.email = email;
            await user.save();
            await redisService.deleteVerificationCode(email);
            res.status(200).json({ message: 'Email verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid verification code' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during verification', error: error.message });
    }
}

module.exports = {
    getUserInfo,
    sendCode, 
    verifyCode
}