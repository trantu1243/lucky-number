const bot = require("../bot");
const { paymentService, userService } = require("../services");

const callbackInvoice = async (req, res) => {
	console.log(req.body);
	const { order_id, status} = req.body;
	const payment = await paymentService.findPaymentByOrderId(order_id);
	payment.payment_status = status;
	await payment.save();

	if (status == 'paid' || status == 'paid_over') {
		const user = await userService.getUserByUserId(payment.userId.userId);
		user.usd += payment.merchant_amount;
		await user.save();
		await bot.telegram.editMessageText(
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
			`<b>✅ You have successfully recharged ${payment.merchant_amount} chips.</b>`, 
			{ 
				parse_mode: 'HTML',
				reply_to_message_id: payment.message_id
			}
		);
	} else if (status == 'cancel') {
		await bot.telegram.editMessageText(
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
			`<b>❌ Recharged failed: ${payment.merchant_amount} USDT</b>
<b>Reason: Recharge time expired.</b>`, 
			{ 
				parse_mode: 'HTML',
				reply_to_message_id: payment.message_id
			}
		);
	} else if (status == 'wrong_amount') {
		await bot.telegram.editMessageText(
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
			`<b>❌ Recharged failed: ${payment.merchant_amount} USDT</b>
<b>Reason: Incorrect amount.</b>`, 
			{ 
				parse_mode: 'HTML',
				reply_to_message_id: payment.message_id
			}
		);
	}
} 

module.exports = {
    callbackInvoice
}