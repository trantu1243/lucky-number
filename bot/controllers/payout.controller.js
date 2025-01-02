const bot = require("../bot");
const { payoutService, userService } = require("../services");

const callbackPayout = async (req, res) => {
    console.log(req.body);
    const { order_id, status} = req.body;
	const payout = await payoutService.findPayoutByOrderId(order_id);
    payout.status = status;
	await payout.save();
    const user = await userService.getUserByUserId(payout.userId.userId);

    if (status === 'paid') {
        user.usd -= payout.amount + 1;
        user.save();

        await bot.telegram.sendMessage(
			payout.userId.userId, 
			`<b>✅ You have successfully withdrawn ${Math.floor(payout.amount + 1)} chips.</b>`, 
			{ 
				parse_mode: 'HTML',
			}
		);
    } else if (status === 'fail') {
        await bot.telegram.sendMessage(
			payout.userId.userId, 
			`<b>❌ Withdrawal failed. Please try again.</b>`, 
			{ 
				parse_mode: 'HTML',
			}
		);
    } else if (status === 'system_fail') {
        await bot.telegram.sendMessage(
			payout.userId.userId, 
			`<b>❌ A system error has occurred.</b>`, 
			{ 
				parse_mode: 'HTML',
			}
		);
    } else if (status === 'check') {
        await bot.telegram.sendMessage(
			payout.userId.userId, 
			`<b>The payout is being verified.</b>`, 
			{ 
				parse_mode: 'HTML',
			}
		);
    } else if (status === 'cancel') {
        await bot.telegram.sendMessage(
			payout.userId.userId, 
			`<b>❌ Payout cancelled.</b>`, 
			{ 
				parse_mode: 'HTML',
			}
		);
    }
}

const createPayout = async (req, res) => {
	try{
        const user = await userService.getUserByUserId(req.userId);
        const timeNow = Math.floor(Date.now() / 1000);
        if (timeNow - user.payout_time < 600) 
            return res.send({
                status: false,
                msg: ''
            });
        if (Number(req.body.amount) > user.usd || Number(req.body.amount) < 5) 
            return res.status(400);
        const order_id = uuidv4();
		const data = {
			amount: String(Number(req.body.amount - 1)),
			currency: req.body.currency,
			network: req.body.network,
            order_id: order_id,
            address: req.body.address,
            is_subtract: "0",
		};

		const url = `${process.env.HOSTING_URL}/create-payout`;
		const headers = {
			'x-internal-token': INTERNAL_TOKEN
		};

		const response = await axios.post(url, data, { headers });
				
		const result = response.data;
		console.log(result);
        if (result.state = 1) 
            return res.status(400);
		const payoutBody = result.result;
		payoutBody.userId = user;
        payoutBody.order_id = order_id;

		const payout = await payoutService.createPayout(payoutBody);
        user.payout_time = Math.floor(Date.now() / 1000);
        await user.save();
		const {address, amount, createdAt, currency, network, status, updatedAt} = payout;

		res.status(401).send({
            status: true,
            msg: '',
            payout: {address, amount, createdAt, currency, network, status, updatedAt}
        });
	}
	catch (error) {
		console.log(error);
		res.status(500);
	}
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
    getPayoutAddress,
    createPayout
}