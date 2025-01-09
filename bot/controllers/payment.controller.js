const bot = require("../bot");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const { paymentService, userService } = require("../services");
const { getSocket } = require("../socket/socketHandler");
require('dotenv').config();

const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN;

const callbackInvoice = async (req, res) => {
	try {
		console.log(req.body);
		const { order_id, status} = req.body;
		const payment = await paymentService.findPaymentByOrderId(order_id);
		payment.payment_status = status;
		await payment.save();
		const io = getSocket();

		if (status === 'paid' && !payment.check) {
			const user = await userService.getUserByUserId(payment.userId.userId);
			user.usd += payment.chip;
			payment.check = true;
			await payment.save();
			await user.save();
			
			await bot.telegram.sendMessage(
				payment.userId.userId, 
				`<b>✅ You have successfully deposited ${Math.floor(payment.chip)} chips.</b>`, 
				{ 
					parse_mode: 'HTML',
				}
			);
			io.to(user.socketId).emit('paid', {
				msg: `${payment.chip}`
			});

		} else if (status === 'paid_over' && !payment.check) {
			const user = await userService.getUserByUserId(payment.userId.userId);
			const chip = Math.floor(payment.chip / Number(payment.amount) * Number(payment.payment_amount))
			user.usd += chip;
			payment.check = true;
			await payment.save();
			await user.save();

			if (currency === 'USDT') {
				await bot.telegram.sendMessage(
					payment.userId.userId, 
					`<b>✅ You have successfully deposited ${Math.floor(payment.amount)} chips.</b>`, 
					{ 
						parse_mode: 'HTML',
					}
				);
			}
			io.to(user.socketId).emit('paid_over', {
				msg: `${chip}`
			});
		} else if (status === 'cancel') {
			const user = await userService.getUserByUserId(payment.userId.userId);
			payment.check = true;
			await payment.save();
			
			await bot.telegram.sendMessage(
				payment.userId.userId, 
				`<b>❌ Deposited failed: ${Math.floor(payment.chip)} chips</b>
<b>Reason: Deposit time expired.</b>`, 
				{ 
					parse_mode: 'HTML',
				}
			);
			io.to(user.socketId).emit('cancel', {
				msg: `${payment.chip}`
			});
		} else if (status === 'wrong_amount' && !payment.check) {
			const user = await userService.getUserByUserId(payment.userId.userId);
			payment.check = true;
			await payment.save();
			const { amount, payment_amount, currency, network} = req.body;
			if (Number(amount) > Number(payment_amount)) {
				
				const data = {
					amount: String(Number(amount) - Number(payment_amount)),
					currency: currency,
					order_id: uuidv4(),
					to_currency: 'USDT',
					network: network,
					lifetime: "900"
				};

				const url = `${process.env.HOSTING_URL}/create-invoice`;
				const headers = {
					'x-internal-token': INTERNAL_TOKEN
				};

				const response = await axios.post(url, data, { headers });
						
				const result = response.data;

				console.log(result);
				const paymentBody = result.result;
				paymentBody.userId = user;
				paymentBody.chip = payment.chip;
				const newPayment = await paymentService.createPayment(paymentBody);

				user.payment_time = Math.floor(Date.now() / 1000);
				await user.save();
			}
			await bot.telegram.sendMessage(
				payment.userId.userId, 
				`<b>❌ Deposited failed: ${Math.floor(payment.chip)} chips</b>
<b>Reason: Incorrect amount.</b>
<b>Please top up more.</b>`, 
				{ 
					parse_mode: 'HTML',
				}
			);

			io.to(user.socketId).emit('wrong_amount', {
				msg2: `${String(Number(amount) - Number(payment_amount))} {payment.currency}`,
				msg: `${payment.chip}`
			});
		}
	}
	catch (e) {
		console.log(e)
	}
} 

const createPayment = async (req, res) => {
	try{
		if (req.body.amount < 5) return res.status(400);
		const user = await userService.getUserByUserId(req.userId);
		const paymentCheck = await paymentService.checkPaymentByUserId(user);
		if (paymentCheck) return res.status(400);
		let course = 1;
		if (req.body.currency !== "USDT") {
			const resp = await axios.get(`https://api.cryptomus.com/v1/exchange-rate/${req.body.currency}/list`);
			const resu = resp.data.result;
			const usdtItem = resu.find((item) => item.to === "USDT");
			course = usdtItem.course;
		}

		let estimate = Math.ceil((req.body.amount / course) / 0.98 * 1000) / 1000;
		if (req.body.currency === 'USDT') estimate = Math.ceil((req.body.amount / course) / 0.98 * 100) / 100;

		console.log(String(estimate));

		const data = {
			amount: String(estimate),
			currency: req.body.currency,
			order_id: uuidv4(),
			to_currency: 'USDT',
			network: req.body.network,
			lifetime: "900"
		};

		const url = `${process.env.HOSTING_URL}/create-invoice`;
		const headers = {
			'x-internal-token': INTERNAL_TOKEN
		};

		const response = await axios.post(url, data, { headers });
				
		const result = response.data;
		console.log(result);
		const paymentBody = result.result;
		paymentBody.userId = user;
		paymentBody.chip = Number(req.body.amount);
		const payment = await paymentService.createPayment(paymentBody);

		user.payment_time = Math.floor(Date.now() / 1000);
        await user.save();

		const {address, address_qr_code, amount, createdAt, currency, expired_at, merchant_amount, network, payment_status, updatedAt} = payment;

		res.status(401).send({
			status: true,
			payment: {address, address_qr_code, amount, createdAt, currency, expired_at, merchant_amount, network, payment_status, updatedAt}
		});
	}
	catch (error) {
		console.log(error);
		res.status(500);
	}
}

const checkPayment = async (req, res) => {
	try {
		const user = await userService.getUserByUserId(req.userId);
		const payment = await paymentService.checkPaymentByUserId(user);
		if (payment) return res.send({
			status: true,
			payment
		}) 
		else return res.send({
			status: false,
			payment
		});
	}
	catch (error) {
		console.log(error);
		res.status(500);
	}
}

const cancelPayment = async (req, res) => {
	try {
		const user = await userService.getUserByUserId(req.userId);
		await paymentService.cancelPaymentByUserId(user);
		return res.send({
			status: true,
		}) 
	}
	catch (error) {
		console.log(error);
		res.status(500);
	}
}

const checkPaid = async (req, res) => {
	try {
		const user = await userService.getUserByUserId(req.userId);
		const payment = await paymentService.findPaymentById(req.body.id);

		if (!user || !payment) {
			return res.status(404).send({
				status: false,
				payment_status: ''
			});
		}
		
		if (payment.userId === user.id && payment.payment_status === 'paid'){
			return res.send({
				status: true,
				payment_status: payment.payment_status
			});
		} else {
			return res.send({
				status: false,
				payment_status: payment.payment_status
			});
		}
	}
	catch (error) {
		console.log(error);
		res.status(500);
	}
}

const getExchangeRate = async (req, res) => {
	try {
		const {currency, amount} = req.body;
		let course = 1;
		if (currency !== "USDT") {
			const response = await axios.get(`https://api.cryptomus.com/v1/exchange-rate/${currency}/list`);
			const result = response.data.result;
			const usdtItem = result.find((item) => item.to === "USDT");
			course = usdtItem.course;
		}
		
		let estimate = Math.ceil((amount / course) / 0.98 * 1000) / 1000;
		if (currency === 'USDT') estimate = Math.ceil((amount / course) / 0.98 * 100) / 100;
		return res.send({
			status: true,
			estimate
		});
	}
	catch (error) {
		console.log(error);
		res.status(500);
	}
}

module.exports = {
    callbackInvoice,
	createPayment,
	checkPayment,
	cancelPayment,
	checkPaid,
	getExchangeRate
}