const { userService } = require("../services")

const getUserInfo = async (req, res) => {
    console.log(req.body);
    const { usd, experience, level, charged, amountDeposited, invitation, payment_time, payout_time } = await userService.getUserByUserId(req.initData.user.id);
    if (usd) res.send({ usd, experience, level, charged, amountDeposited, invitation, payment_time, payout_time });
    else res.status(404);
}

module.exports = {
    getUserInfo
}