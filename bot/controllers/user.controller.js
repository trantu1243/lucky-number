const { userService } = require("../services")

const getUserInfo = async (req, res) => {
    console.log(req.body);
    const { usd, experience, level, charged, amountDeposited, invitation, payment_time, payout_time } = await userService.getUserByUserId();
    res.send({ usd, experience, level, charged, amountDeposited, invitation, payment_time, payout_time });
}


module.exports = {
    getUserInfo
}