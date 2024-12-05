const bot = require("../bot");
const { payoutService, userService } = require("../services");

const callbackPayout =async (req, res) => {
    console.log(req.body);
    const { order_id, status} = req.body;
	const payout = await payoutService.findPayoutByOrderId(order_id);
    payout.status = status;
	await payout.save();
}

module.exports = {
    callbackPayout
}