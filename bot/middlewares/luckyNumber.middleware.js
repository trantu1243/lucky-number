const { Markup } = require("telegraf");
const { userService } = require("../services");

const menu = [
    [Markup.button.callback('Lucky Number', 'lucky_number')],
    [Markup.button.callback('Recharge','recharge'), Markup.button.callback('Withdraw', 'withdraw')]
]

const checkUserUsd = async (ctx, next) => {
    try {
        const user = await userService.getUserByUserId(ctx.from.id);
        if (user && user.usd >= 1) {
            return next();
        } else {
            return ctx.reply('You need at least 10 chips to participate in the lucky number game, please top up.',
                Markup.inlineKeyboard(menu)
            );
        }
    } catch (error) {
        console.error(error);
        return ctx.reply('An error occurred, please wait a min');
    }
};

module.exports = {
    checkUserUsd
}