const bot = require("../bot");
const axios = require("axios");
const { payoutService, userService } = require("../services");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN;

const networks = ["TRON", "BSC", "ETH", "TON"]

const callbackPayout = async (req, res) => {
    try {
        console.log(req.body);
        const { order_id, status } = req.body;
        const payout = await payoutService.findPayoutByOrderId(order_id);
        payout.status = status;
        await payout.save();
        const user = await userService.getUserByUserId(payout.userId.userId);

        if (status === 'paid' && !payment.check) {
            user.usd -= payout.amount + 1;
            user.save();

            payout.check = true;
			await payout.save();

            await bot.telegram.sendMessage(
                payout.userId.userId, 
                `<b>✅ You have successfully withdrawn ${Math.floor(payout.chip)} Chip.</b>`, 
                { 
                    parse_mode: 'HTML',
                }
            );

            io.to(user.socketId).emit('paid_payout', {
				msg: `${chip}`
			});
        } else if (status === 'fail' && !payment.check) {
            payout.check = true;
			await payout.save();
            await bot.telegram.sendMessage(
                payout.userId.userId, 
                `<b>❌ Withdrawal failed. Please try again.</b>`, 
                { 
                    parse_mode: 'HTML',
                }
            );
            io.to(user.socketId).emit('fail_payout', {
				msg: `${chip}`
			});
        } else if (status === 'system_fail' && !payment.check) {
            payout.check = true;
			await payout.save();
            await bot.telegram.sendMessage(
                payout.userId.userId, 
                `<b>❌ A system error has occurred.</b>`, 
                { 
                    parse_mode: 'HTML',
                }
            );
            io.to(user.socketId).emit('system_fail_payout', {
				msg: `${chip}`
			});
        } else if (status === 'check' && !payment.check) {
            await bot.telegram.sendMessage(
                payout.userId.userId, 
                `<b>The payout is being verified.</b>`, 
                { 
                    parse_mode: 'HTML',
                }
            );
            io.to(user.socketId).emit('check_payout', {
				msg: `${chip}`
			});
        } else if (status === 'cancel' && !payment.check) {
            payout.check = true;
			await payout.save();
            await bot.telegram.sendMessage(
                payout.userId.userId, 
                `<b>❌ Payout cancelled.</b>`, 
                { 
                    parse_mode: 'HTML',
                }
            );
            io.to(user.socketId).emit('cancel_payout', {
				msg: `${chip}`
			});
        }
    }
    catch (e) {
        console.log(e)
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
        if (Number(req.body.amount) > user.usd || Number(req.body.amount) < 2) 
            return res.status(400);
        const order_id = uuidv4();
        if (req.body.currency !== "USDT" || !networks.includes(req.body.network)){
            return res.status(400);
        }
		const data = {
			amount: String(Number(req.body.amount - 0.5)),
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
        if (result.state === 1) 
            return res.status(400);
		const payoutBody = result.result;
		payoutBody.userId = user;
        payoutBody.order_id = order_id;
        payoutBody.chip = Number(req.body.amount);
		const payout = await payoutService.createPayout(payoutBody);
        user.payout_time = Math.floor(Date.now() / 1000);
        await user.save();
		const {address, amount, createdAt, currency, network, status, updatedAt} = payout;

        console.log(payout)

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
        if (currency !== "USDT" || !networks.includes(network)) 
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

const deletePayoutAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const user = await userService.getUserByUserId(req.userId);
        user.payout_address = user.payout_address.filter(item => item.address !== address);
        await user.save();
        return res.send({
            status: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
}

const getServicePayout = async (req, res) => {
    try{
        const data = {};

        const url = `${process.env.HOSTING_URL}/payout-service`;
        const headers = {
            'x-internal-token': INTERNAL_TOKEN
        };

        const response = await axios.post(url, data, { headers });
                
        if (response.data.state === 0) {
            const result = response.data.result;
            const usdt = result.filter(item => item.currency === 'USDT');
            return res.send(usdt);
        } else {
            return res.status(500);
        }
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
    createPayout,
    deletePayoutAddress,
    getServicePayout
}