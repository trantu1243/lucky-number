const { userService } = require("../services")

const getUserInfo = async (req, res) => {
    console.log(req.body);
    const { usd, experience, level, charged, amountDeposited, invitation, payment_time, payout_time, createdAt, updatedAt } = await userService.getUserByUserId(req.userId);
    if (usd) res.send({ usd, experience, level, charged, amountDeposited, invitation, payment_time, payout_time, createdAt, updatedAt });
    else res.status(404);
}

module.exports = {
    getUserInfo
}