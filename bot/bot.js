const { Telegraf, Markup } = require('telegraf');
const { userService } = require('./services');
const { luckyNumberMiddleware } = require('./middlewares');
const { message } = require('telegraf/filters');
const { botFunction, luckyNumberFunction, withdrawFunction, rechargeFunction } = require('./functions');
const userState = require('./userState');

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const webhookURL = process.env.WEBHOOK_URL || 'https://api.lucky-number.net';

bot.telegram.setWebhook(`${webhookURL}/bot${encodeURIComponent(process.env.BOT_TOKEN)}`);

bot.start(botFunction.startBot);

bot.command("profile", botFunction.getProfile);
bot.hears('👤Profile', botFunction.getProfileWebapp);
bot.hears('🎰Minigames', botFunction.getMinigames);
bot.hears('📜History', async (ctx) => {
    await botFunction.sendHistory(ctx, 1, true);
});
bot.hears('📋Tasks', botFunction.getTasks);
bot.action('daily_task', botFunction.getDailyTask);
bot.action('back_tasks', botFunction.backTasks);

bot.hears('💰Withdraw', withdrawFunction.getWithdraw);
bot.action('back_withdraw', withdrawFunction.backWithdraw);
bot.action('withdraw', withdrawFunction.startWithdraw);

bot.hears('⚡Recharge', rechargeFunction.getRecharge);
bot.action('back_recharge', rechargeFunction.backRecharge);
bot.action('recharge', rechargeFunction.startRecharge);

bot.hears('Webapp', botFunction.getWebapp);


//lucky number game

bot.action('lucky_number', luckyNumberFunction.getGame);
bot.action('ln_step1', luckyNumberMiddleware.checkUserUsd, luckyNumberFunction.stepOne);
bot.action('ln_step1_test', luckyNumberFunction.stepOneTest);
bot.action('back_minigame', botFunction.backMinigames);

bot.on(message('text'), async (ctx) => {
    try{
        const userId = ctx.from.id;
        const input = ctx.message.text.trim();
        const game = userState[userId]?.game;
        const action = userState[userId]?.action;
        const user = await userService.getUserByUserId(userId);
    
        // lucky_number
        if (game === 'lucky_number') {
            await luckyNumberFunction.onText(ctx, userId, input, user);
            return
        }

        if (action === 'recharge') {
            await rechargeFunction.onAmount(ctx, input, user)
        }

    }
    catch (error) {
        console.log(error)
    }
});

bot.on('callback_query', async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data.startsWith('history_')) {
        const page = parseInt(data.split('_')[1], 10);
        console.log(page);
        await botFunction.sendHistory(ctx, page);
        return
    }
    if (data === 'leave') {
        await botFunction.leave(ctx)
        return
    };
});

bot.action('leave', botFunction.leave)

bot.help((ctx) => ctx.reply('Send me a sticker'));

module.exports = bot;