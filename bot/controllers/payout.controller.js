const bot = require("../bot");
const { payoutService, userService } = require("../services");

const callbackPayout = async (req, res) => {
    console.log(req.body);
    const { order_id, status} = req.body;
	const payout = await payoutService.findPayoutByOrderId(order_id);
    payout.status = status;
	await payout.save();
}

const addPayoutAddress = async (req, res) => {
    try {
            const { address, currency, network} = req.body;
            if (currency !== "USDT" || network !== "TRON") 
                return res.status(400);
            const user = await userService.getUserByUserId(req.userId);
            if (user.payout_address.length > 3) 
                return res.status(400);
            user.payout_address.push({
                address,
                currency,
                network
            })
            await user.save();
            return res.status(201).send({
                status: true
            });
        }
        catch (error) {
            console.log(error);
            res.status(500);
        }
}

const getPayoutAddress = async (req, res) => {
    try {
            const user = await userService.getUserByUserId(req.userId);
            return res.send({
                status: true,
                result: user.payout_address
            });
        }
        catch (error) {
            console.log(error);
            res.status(500);
        }
}


module.exports = {
    callbackPayout,
    addPayoutAddress,
    getPayoutAddress
}