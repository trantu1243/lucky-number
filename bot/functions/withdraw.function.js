const { Markup } = require("telegraf");
const userState = require("../userState");

const getWithdraw = async (ctx) => {
    try{
        userState[ctx.from.id] = {};
        ctx.reply('Choose section below:',
            Markup.inlineKeyboard([
                [Markup.button.callback('💰Withdraw', 'withdraw'), Markup.button.callback('📜Withdraw history', 'withdraw_history')],
            ])
        );
    }
    catch (error) {
        console.log(error);
    }
}

const backWithdraw = async (ctx) => {
    try{
        userState[ctx.from.id] = {};
        ctx.editMessageText('Choose section below:',
            Markup.inlineKeyboard([
                [Markup.button.callback('💰Withdraw', 'withdraw'), Markup.button.callback('📜Withdraw history', 'withdraw_history')],
            ])
        );
    }
    catch (error) {
        console.log(error);
    }
}

const startWithdraw = async (ctx) => {
    try {
        userState[ctx.from.id] = {
            ...userState[ctx.from.id], 
            action: 'withdraw'   
        };
        ctx.editMessageText(
                `The system only accepts USDT deposits via the TRON network.
⚖️ Rate: 1 USDT = 1 Chip
💰 Enter the amount you want to deposit (minimum 10 USDT).
                `,
                Markup.inlineKeyboard([
                    Markup.button.callback('🚪 Back', 'back_withdraw'),
                ])
        );
    }
    catch {

    }
}

module.exports = {
    getWithdraw,
    backWithdraw, 
    startWithdraw
}