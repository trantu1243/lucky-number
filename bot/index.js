const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bot = require('./bot');
const { dailyTaskService } = require('./services');
const { CronJob } = require('cron');
require('dotenv').config();

mongoose.connect('mongodb://admin:admin036203@mongodb-container:27017/lucky_number?authSource=admin').then(() => {
    console.log("Connect to mongodb successfully")
});

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/cryptomus_a2c0610a.html', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'cryptomus.html'));
});

app.get('/', (req, res) => {
	console.log(req.headers);
	console.log('get');
	console.log(req.ip);
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post(`/bot${process.env.BOT_TOKEN}`, async (req, res) => {
	try{
		const userIp = req.headers['x-forwarded-for'] || req.ip;
		console.log(`User IP: ${userIp}`);
		req.body.userIp = userIp;
		await bot.handleUpdate(req.body);
		res.sendStatus(200); 
	} catch (error) {
		console.log(error)
	}

});

const job = new CronJob(
	'* * * * *', // cronTime
	async () => {
		await dailyTaskService.resetDailyTask();
	}, // onTick
	null, // onComplete
	true, // start
	'Europe/London' // timeZone
);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// dailyTaskService.createDailyTask({rank: 1, milestone: 10, reward: 1});
// dailyTaskService.createDailyTask({rank: 2, milestone: 100, reward: 5});
// dailyTaskService.createDailyTask({rank: 3, milestone: 500, reward: 10});
// dailyTaskService.createDailyTask({rank: 4, milestone: 1000, reward: 15});
// dailyTaskService.createDailyTask({rank: 5, milestone: 3000, reward: 33});
// dailyTaskService.createDailyTask({rank: 6, milestone: 5000, reward: 55});
// dailyTaskService.createDailyTask({rank: 7, milestone: 10000, reward: 111});
// dailyTaskService.createDailyTask({rank: 8, milestone: 20000, reward: 222});
// dailyTaskService.createDailyTask({rank: 9, milestone: 50000, reward: 555});