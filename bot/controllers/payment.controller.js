const bot = require("../bot");
const axios = require("axios");
const { paymentService, userService } = require("../services");
require('dotenv').config();

const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN;

const callbackInvoice = async (req, res) => {
	console.log(req.body);
	const { order_id, status} = req.body;
	const payment = await paymentService.findPaymentByOrderId(order_id);
	payment.payment_status = status;
	await payment.save();

	if (status == 'paid' || status == 'paid_over') {
		const user = await userService.getUserByUserId(payment.userId.userId);
		user.usd += Math.floor(payment.merchant_amount);
		await user.save();
		await bot.telegram.editMessageCaption(
			payment.userId.userId, 
			payment.message_id, 
			null, 
			`Send an amount equal to or greater than: <code>${payment.amount}</code> ${payment.currency} tron(TRC20)
To this address: <code>${payment.address}</code>

⏰ <b>✅ YOU HAVE SUCCESSFULLY RECHARGED.</b>`, 
			{ parse_mode: 'HTML' }
		);
		await bot.telegram.sendMessage(
			payment.userId.userId, 
			`<b>✅ You have successfully recharged ${Math.floor(payment.merchant_amount)} chips.</b>`, 
			{ 
				parse_mode: 'HTML',
				reply_to_message_id: payment.message_id
			}
		);
	} else if (status == 'cancel') {
		await bot.telegram.editMessageCaption(
			payment.userId.userId, 
			payment.message_id, 
			null, 
			`Send an amount equal to or greater than: <code>${payment.amount}</code> ${payment.currency} tron(TRC20)
To this address: <code>${payment.address}</code>

⏰ <b>❌ RECHARGED FAILED: RECHARGE TIME EXPIRED.</b>`, 
			{ parse_mode: 'HTML' }
		);
		await bot.telegram.sendMessage(
			payment.userId.userId, 
			`<b>❌ Recharged failed: ${Math.floor(payment.merchant_amount)} USDT</b>
<b>Reason: Recharge time expired.</b>`, 
			{ 
				parse_mode: 'HTML',
				reply_to_message_id: payment.message_id
			}
		);
	} else if (status == 'wrong_amount') {
		await bot.telegram.editMessageCaption(
			payment.userId.userId, 
			payment.message_id, 
			null, 
			`Send an amount equal to or greater than: <code>${payment.amount}</code> ${payment.currency} tron(TRC20)
To this address: <code>${payment.address}</code>

⏰ <b>❌ RECHARGED FAILED: INCORRECT AMOUNT.</b>`, 
			{ parse_mode: 'HTML' }
		);
		await bot.telegram.sendMessage(
			payment.userId.userId, 
			`<b>❌ Recharged failed: ${Math.floor(payment.merchant_amount)} USDT</b>
<b>Reason: Incorrect amount.</b>`, 
			{ 
				parse_mode: 'HTML',
				reply_to_message_id: payment.message_id
			}
		);
	}
} 

const createPayment = async (req, res) => {
	try{
		const amountNum = Math.ceil(Number(req.body.amount) / 0.98 * 10) / 10;
		const data = {
			amount: String(amountNum),
			currency: req.body.currency,
			order_id: '10',
			to_currency: 'USDT',
			network: req.body.network,
			lifetime: "300"
		};

		const url = `${process.env.HOSTING_URL}/create-invoice`;
		const headers = {
			'x-internal-token': INTERNAL_TOKEN
		};

		const response = await axios.post(url, data, { headers });
				
		const result = response.data;
		console.log(result);
		const paymentBody = result.result;
		paymentBody.userId = await userService.getUserByUserId(req.userId);;
		const payment = await paymentService.createPayment(paymentBody);
		const {address, address_qr_code, amount, createdAt, currency, expired_at, merchant_amount, network, payment_status, updatedAt} = payment;

		res.status(401).send(payment);
	}
	catch (error) {
		console.log(error);
		res.status(500);
	}
}

module.exports = {
    callbackInvoice,
	createPayment
}