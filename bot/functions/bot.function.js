const { Markup } = require("telegraf");
var geoip = require('geoip-lite');
const { userService, historyService } = require("../services");
const userState = require("../userState");
const { History } = require("../models");

const menu = [
    [Markup.button.callback('🎰Minigames', 'minigames'), Markup.button.callback('👤Profile','profile')],
    [Markup.button.callback('📋Tasks', 'tasks'), Markup.button.callback('📜History','history')],
    [Markup.button.callback('⚡Recharge','recharge'), Markup.button.callback('💰Withdraw', 'withdraw')]
]

const startBot = async (ctx) => {
    try {
        const { id: userId, first_name: firstName, username } = ctx.from;

        // const userIp = ctx.update.userIp;
        // console.log(userIp);
        // const geo = geoip.lookup(userIp);

        // console.log(`IP Location: ${JSON.stringify(geo)}`);
        // if (geo.country === 'VN') {
        //     ctx.reply('We do not support your country.');
        //     return;
        // }

        const un = username ? username : "undefined";
        const user = await userService.createUser({userId, username: un, name: firstName});
        user.usd = 0;
        await user.save();
        let message = `🎉 <i>Welcome <b>${user.name}</b> to Lucky Number Bot!</i> 🎉

Here, you can enjoy exciting mini-games and earn rewards 💰.
Your luck will depend entirely on the numbers you choose 🔢.
        `;
        if (!user.charged) {
            message = message + `
🎯 <b><i>First Task:</i></b>
<i>To start playing the mini-games, you need to deposit at least 10 USDT (equivalent to 10 chips) </i>💎.
<i>Progress:</i> <b>0/10</b> 🚀`;
        }
        ctx.reply(message, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    ['🎰Minigames', '👤Profile'],
                    ['📋Tasks', '📜History'],
                    ['⚡Recharge', '💰Withdraw'],
                    ['❓Help', '🔧Setting'],
                    ['Webapp']
                ],
                resize_keyboard: true,
                one_time_keyboard: false 
            }
        });
    }
    catch (e) {
        console.log(e)
    }
}

const getProfile = async (ctx) => {
    try {
        const user = await userService.getUserByUserId(ctx.from.id);
        userState[ctx.from.id] = {};
        ctx.reply(`
👤 <b><i>${user.name}</i></b>

💵 <i>Chips:</i> <b>${user.usd}</b>
🎖 <i>Level:</i> <b>${user.level}</b>
🎲 <i>Hands won:</i> <b>${user.won}</b>
📅 <i>Player since:</i> <b>${user.createdAt.toISOString().split("T")[0]}</b>
🕒 <i>Last played:</i> <b>${user.updatedAt.toISOString().split("T")[0]}</b>
            `, {
                parse_mode: 'HTML',
            }        
        );
    }
    catch (error) {
        console.log(error);
    }
}

const getMinigames = async (ctx) => {
    try{
        const user = await userService.getUserByUserId(ctx.from.id);

        let message = `Here, you can enjoy exciting mini-games and earn rewards 💰.
Your luck will depend entirely on the numbers you choose 🔢.
        `;
        if (!user.charged) {
            message = message + `
🎯 First Task:
To start playing the mini-games, you need to deposit at least 10 USDT (equivalent to 10 chips) 💎.
Progress: 0/10 🚀`;
        }
        userState[ctx.from.id] = {};
        ctx.reply(message,
            Markup.inlineKeyboard([
                [Markup.button.callback('Lucky Number', 'lucky_number')],
            ])
        );
    }
    catch (error) {
        console.log(error);
    }
}

const backMinigames = async (ctx) => {
    try{
        const user = await userService.getUserByUserId(ctx.from.id);

        let message = `Here, you can enjoy exciting mini-games and earn rewards 💰.
Your luck will depend entirely on the numbers you choose 🔢.
        `;
        if (!user.charged) {
            message = message + `
🎯 First Task:
To start playing the mini-games, you need to deposit at least 10 USDT (equivalent to 10 chips) 💎.
Progress: 0/10 🚀`;
        }
        userState[ctx.from.id] = {};
        ctx.editMessageText(message,
            Markup.inlineKeyboard([
                [Markup.button.callback('Lucky Number', 'lucky_number')],
            ])
        );
    }
    catch (error) {
        console.log(error);
    }
}

async function sendHistory(ctx, page, check = false) {
    try {
        const user = await userService.getUserByUserId(ctx.from.id);
        const histories = await historyService.getHistoryByUserId(user, page);

        const totalCount = await History.countDocuments({ userId: user });
        const totalPages = Math.ceil(totalCount / 3);
        const skip = (page - 1) * 3;

        if (!histories.length) {
            return ctx.reply('❌ No game history found!');
        }

        let message = `🎮 <b>Your Game History (Page ${page}/${totalPages}):</b>\n\n`;

        histories.forEach((history, index) => {
            const resultIcon = history.result === 'win' ? '🏆' : '❌';
            message += `${index + 1 + skip}. ${resultIcon} <i>Game:</i> <b>${history.game}</b>\n`;
            message += `     💰 <i>Amount:</i> <b>${history.amount > 0 ? '+' + history.amount : history.amount}</b> Chips\n`;
            message += `     📅 <i>Played At:</i> <b>${new Date(history.playedAt).toLocaleString()}</b>\n\n`;
        });

        const buttons = [];
        if (page > 1) {
            buttons.push({ text: '⬅️ Previous', callback_data: `history_${page - 1}` });
        }
        if (page < totalPages) {
            buttons.push({ text: '➡️ Next', callback_data: `history_${page + 1}` });
        }
        if (!check) {
            await ctx.editMessageText(message, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [buttons]
                },
            });
        } else {
            userState[ctx.from.id] = {};
            await ctx.reply(message, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [buttons]
                },
            });
        }
       
    } catch (error) {
        console.error(error);
        ctx.reply('⚠️ Failed to retrieve game history. Please try again later.');
    }
}

const getTasks = async (ctx) => {
    userState[ctx.from.id] = {};
    ctx.reply('Choose section below:', Markup.inlineKeyboard([[Markup.button.callback('🗂️Main Tasks', 'main_tasks'), Markup.button.callback('📝Daily Task', 'daily_task')]]))
}

const backTasks = async (ctx) => {
    ctx.editMessageText('Choose section below:', Markup.inlineKeyboard([[Markup.button.callback('🗂️Main Tasks', 'main_tasks'), Markup.button.callback('📝Daily Task', 'daily_task')]]))
}

const getDailyTask = async (ctx) => {
    const tasks = await userService.getDailyTask(ctx.from.id);
    let message = `📋 <b><i>Daily Task</i></b>\n
<pre>
<b>Rank</b>    <b>Milestone</b>      <b>Reward</b>
-----------------------------------------
`;
    
    tasks.forEach((value, index) => {
        // Căn chỉnh các cột bằng cách thêm khoảng trắng
        const rank = `#${index + 1}`.padEnd(8); // Độ dài 8
        const milestone = `${value.milestone}`.padEnd(15); // Độ dài 15
        const reward = `+${value.reward}`.padEnd(10); // Độ dài 10
    
        message += `${rank}${milestone}${reward}\n`;
    });
    
    message += '</pre>\n🚨 <b>Note:</b> <i>Calculated based on the total bets for the day, rewards are paid immediately after reaching the milestone.</i>';
    ctx.editMessageText(message, {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([[Markup.button.callback('🚪Back', 'back_tasks')]])
    });
}

const leave = async (ctx) => {
    try {
        const user = await userService.getUserByUserId(ctx.from.id);

        let message = `🎉 <i>Welcome <b>${user.name}</b> to Lucky Number Bot!</i> 🎉

Here, you can enjoy exciting mini-games and earn rewards 💰.
Your luck will depend entirely on the numbers you choose 🔢.
        `;
        if (!user.charged) {
            message = message + `
🎯 <b><i>First Task:</i></b>
<i>To start playing the mini-games, you need to deposit at least 10 USDT (equivalent to 10 chips) </i>💎.
<i>Progress:</i> <b>0/10</b> 🚀`;
        }
        userState[ctx.from.id] = {};
        ctx.reply(message, {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard(menu)
        })
    }
    catch (error) {
        console.log(error)
    }
}

const getWebapp = async (ctx) => {
    try{
        ctx.reply('Choose section below:',
            Markup.inlineKeyboard([
                Markup.button.webApp('Open Web App', 'https://lucky-number.net') 
              ])
        );
    }
    catch (error) {
        console.log(error);
    }
}

const getProfileWebapp = async (ctx) => {
    try{
        ctx.reply('Choose section below:',
            Markup.inlineKeyboard([
                Markup.button.webApp('Open Web App', 'https://lucky-number.net/Profile') 
              ])
        );
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    startBot,
    getProfile,
    getMinigames,
    backMinigames,
    getDailyTask,
    sendHistory,
    getTasks,
    backTasks,
    getWebapp,
    getProfileWebapp,
    leave
}