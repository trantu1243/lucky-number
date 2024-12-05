const { Markup } = require("telegraf");
const userState = require("../userState");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const { Payment } = require("../models");
const { paymentService, userService } = require("../services");
require('dotenv').config();

const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN;

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }

const getRecharge = async (ctx) => {
    try{
        userState[ctx.from.id] = {};
        ctx.reply('Choose section below:',
            Markup.inlineKeyboard([
                [Markup.button.callback('⚡Recharge', 'recharge'), Markup.button.callback('📜Recharge history', 'recharge_history')],
            ])
        );
    }
    catch (error) {
        console.log(error);
    }
}

const backRecharge = async (ctx) => {
    try{
        userState[ctx.from.id] = {};
        ctx.editMessageText('Choose section below:',
            Markup.inlineKeyboard([
                [Markup.button.callback('⚡Recharge', 'recharge'), Markup.button.callback('📜Recharge history', 'recharge_history')],
            ])
        );
    }
    catch (error) {
        console.log(error);
    }
}

const startRecharge = async (ctx) => {
    try {
        const dateNow = Math.floor(Date.now() / 1000);
        const user = await userService.getUserByUserId(ctx.from.id);

        if (dateNow < user.payment_time + 60) {
            ctx.editMessageText(
                    `<b>❌ You can only create one payment per minute.</b>`,
                    {
                        parse_mode: 'HTML',
                        ...Markup.inlineKeyboard([
                            Markup.button.callback('🚪 Back', 'back_recharge'),
                        ])
                    }   
            );
            return
        } 
        user.payment_time = dateNow;
        await user.save();

        userState[ctx.from.id] = {
            ...userState[ctx.from.id], 
            action: 'recharge'   
        };
        ctx.editMessageText(
                `The system only accepts USDT recharges via the TRON network.
⚖️ <i>Rate:</i> <b>1 USDT = 1 Chip</b>
💰 <i><b>Enter the amount you want to recharge (minimum 10 USDT):</b></i>
                `,
                {
                    parse_mode: 'HTML',
                    ...Markup.inlineKeyboard([
                        Markup.button.callback('🚪 Back', 'back_recharge'),
                    ])
                }   
        );
    }
    catch {

    }
}

const onAmount = async (ctx, input, user) => {
    try {
        if (isNaN(input) || input < 10) {
            ctx.reply(`Enter the amount you want to recharge (minimum 10 USDT): 💰.`);
            return;
        }
        const amount = Math.ceil(Number(input) / 0.98 * 10) / 10;
        const data = {
            amount: String(amount),
            currency: "USDT",
            order_id: uuidv4(),
            network: "tron",
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
        paymentBody.userId = user;
        const payment = await paymentService.createPayment(result.result);

        const base64Data = payment.address_qr_code.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        const expired_at = formatTimestamp(payment.expired_at);
        const editedMessage = await ctx.sendPhoto({ source: imageBuffer }, {
            caption: `Send an amount equal to or greater than: <code>${payment.amount}</code> ${payment.currency} tron(TRC20)
To this address: <code>${payment.address}</code>

💳 <b>PLEASE INCLUDE TRANSACTION FEES IF APPLICABLE (IF ANY). THE SYSTEM WILL ONLY WORK WHEN THE ACCOUNT RECEIVES AN AMOUNT EQUAL TO OR GREATER THAN:</b> <code>${payment.amount}</code> ${payment.currency} tron(TRC20)

⏰ <b><i>PAYMENT WILL EXPIRE AT:</i> ${expired_at}</b>`,
            parse_mode: 'HTML',
        })

        payment.message_id = editedMessage.message_id;
        await payment.save();
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    getRecharge,
    backRecharge, 
    startRecharge,
    onAmount
}