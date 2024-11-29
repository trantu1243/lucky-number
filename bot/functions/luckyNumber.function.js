const { Markup } = require("telegraf");
const crypto = require('crypto');
const userState = require("../userState");
const { historyService } = require("../services");

function hashSHA256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 18);
};

const getGame = async (ctx) => {
    userState[ctx.from.id] = {
        ...userState[ctx.from.id], 
        game: 'lucky_number'   
    };
    ctx.editMessageText(
            `
How to play:

1️⃣ Press "Start" to receive 4 random numbers 🔢 (which will be hashed using SHA-256 🔐).
2️⃣ Enter a sequence of numbers 🔢 (1-8 digits) 📝.
3️⃣ Enter the bet amount in chips 💰.

➕ Add the two sequences of numbers together. If the last two digits of the resulting sequence are:

🎊 00, 10, 20, 30, 40, 50, 60, 70, 80, 90 🎊
    => 🎉 Win x3 the chips 🎉
💎 18, 28, 38, 48, 58, 68, 78, 98 💎
    => ✨ Win x4 the chips ✨
🔥 33, 77, 88 🔥
    => 💥 Win x5 the chips 💥
            `,
            Markup.inlineKeyboard([
                Markup.button.callback('🚀 Start', 'ln_step1'),
                Markup.button.callback('🎮 Try now!', 'ln_step1_test'),
                Markup.button.callback('🚪 Back', 'back_minigame'),
            ])
    );
}

const stepOne = (ctx) => {
    const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const str = generateRandomString() + randomNumber;
    const hashed = hashSHA256(str);
    userState[ctx.from.id] = {...userState[ctx.from.id], game: 'lucky_number', sequence: str, step: 1, hashed, test: false};
    ctx.editMessageText(`🔒 Encoded random sequence: ${hashed}

Please enter a sequence of numbers 🔢 (1-8 digits) 📝.
`, 
    )
}

const stepOneTest = (ctx) => {
    const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const str = generateRandomString() + randomNumber;
    const hashed = hashSHA256(str);
    userState[ctx.from.id] = {...userState[ctx.from.id], game: 'lucky_number', sequence: str, step: 1, hashed, test: true};
    ctx.editMessageText(`🔒 Encoded random sequence: ${hashed}

Please enter a sequence of numbers 🔢 (1-8 digits) 📝.
`, 
    )
}

const onText = async (ctx, userId, input, user) => {
    const step = userState[userId]?.step;

    const sequence = userState[userId]?.sequence;

    if (!sequence) {
        ctx.reply('Please click "Start" to start game!',
            Markup.inlineKeyboard([
                Markup.button.callback('🚀 Start', 'ln_step1'),
                Markup.button.callback('🚪 Leave', 'leave'),
            ]) 
        );
        return;
    }

    let start = 1;
    let end = 20;
    switch (user.level){
        case 'Beginner':
            start = 1; end = 20;
            break;
        case 'Proficient':
            start = 5; end = 100;
            break;
        case 'Master':
            start = 10; end = 200;
            break;
        default:
            break
    }

    if (userState[userId].test) {
        end = 100;
    }

    if (end > user.usd) {
        end = user.usd;
    }
    
    if (step === 1 ) {
        if (input.length < 1 || input.length > 8 || isNaN(input)) {
            ctx.reply('Please enter a sequence of numbers 🔢 (1-8 digits) 📝.');
            return;
        }
        userState[ctx.from.id] = {...userState[ctx.from.id], userSequence: input, step: 2};

        ctx.reply(`Please enter the bet amount in chips (${start} - ${end} chips) 💰.`);
        return;
    }

    if (step === 2){
        if (isNaN(input) || input < start || input > end) {
            ctx.reply(`Please enter the bet amount in chips (${start} - ${end} chips) 💰.`);
            return;
        }
        if (!userState[userId].test) {
            user.usd = user.usd - Number(input);
            await user.save();
        }

        const result = Number(sequence.slice(-4)) + Number(userState[userId].userSequence);

        let message = `🔒 Encoded random sequence: ${userState[userId].hashed}
🔢 Original sequence: ${sequence}
🔢 Your sequence: ${userState[userId].userSequence}

✨ Result: ${sequence.slice(-4)} + ${userState[userId].userSequence} = ${result} ✨

`;

        const lastTwoAsString = String(result).slice(-2).padStart(2, '0');

        userState[ctx.from.id] = {...userState[ctx.from.id], step: 0, userSequence: '', sequence: ''};

        switch (lastTwoAsString){
            case '00':
            case '10':
            case '20':
            case '30':
            case '40':
            case '50':
            case '60':
            case '70':
            case '80':
            case '90':
                message = message + `🎉 Congratulations! 🎉
You hit a lucky ending with ${lastTwoAsString}!
💰 You just tripled your chips! 💰
                `;
                if (!userState[userId].test){
                    user.usd = user.usd + Number(input) * 3;
                    await user.save();
                    await historyService.createHistory({userId: user, game: 'lucky_number', result: 'win', amount: Number(input) * 2});
                }
                break;
            case '18':
            case '28':
            case '38':
            case '48':
            case '58':
            case '68':
            case '78':
            case '98':
                message = message + `✨ Amazing! ✨
Your sequence ended with ${lastTwoAsString}!
💎 You've won 4 times your bet! 💎
                `;
                if (!userState[userId].test){
                    user.usd = user.usd + Number(input) * 4;
                    await user.save();
                    await historyService.createHistory({userId: user, game: 'lucky_number', result: 'win', amount: Number(input) * 3});
                }
                break;
            case '33':
            case '77':
            case '88':
                message = message + `🔥 Unbelievable! 🔥
The last two digits were ${lastTwoAsString}!
💥 You're on fire—5x the chips are yours! 💥
                `;
                if (!userState[userId].test){
                    user.usd = user.usd + Number(input) * 4;
                    await user.save();
                    await historyService.createHistory({userId: user, game: 'lucky_number', result: 'win', amount: Number(input) * 4});
                }
                break;
            default:
                message = message + `💔 Better luck next time! 💔
Your sequence didn’t match any winning criteria.
🔄 Try again and turn the odds in your favor! 😊
                `;
                if (!userState[userId].test){
                    await historyService.createHistory({userId: user, game: 'lucky_number', result: 'lose', amount: -1*Number(input)});
                }
                break;
        }
        message = message + `
You can check the SHA-256 encrypted string by entering the original string at: https://emn178.github.io/online-tools/sha256.html`;
        if (!user.charged) {
            message = message + `

🎯 First Task:
To start playing the mini-games, you need to deposit at least 10 USDT (equivalent to 10 chips) 💎.
Progress: 0/10 🚀`;
        }
        if (!userState[userId].test){
            ctx.reply(message,
                Markup.inlineKeyboard([
                    Markup.button.callback('🚀 Try again', 'ln_step1'),
                    Markup.button.callback('🚪 Back', 'back_minigame'),
                ]) 
            )
            return
        } 
        ctx.reply(message,
            Markup.inlineKeyboard([
                Markup.button.callback('⚡ Recharge', 'recharge'),
                Markup.button.callback('🚀 Start game', 'ln_step1'),
                Markup.button.callback('🚪 Back', 'back_minigame'),
            ]) 
        )
        return
    }
}

module.exports = {
    getGame,
    stepOne,
    stepOneTest,
    onText
}