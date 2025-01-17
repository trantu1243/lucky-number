const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require("socket.io");

const bot = require('./bot');
const { dailyTaskService } = require('./services');
const routes = require('./routes/index');
const { CronJob } = require('cron');
const { internalMiddleware } = require('./middlewares');
const { paymentController, payoutController } = require('./controllers');
const verifySocketConnection = require('./middlewares/validateTelegramSocket.middleware');
const { initSocket } = require('./socket/socketHandler');
require('dotenv').config();

mongoose.connect('mongodb://admin:admin036203@mongodb-container:27017/lucky_number?authSource=admin').then(() => {
    console.log("Connect to mongodb successfully")
});

// bot.launch()

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://lucky-number.net', 
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
});

io.use(verifySocketConnection);

app.use(cors({
	origin: 'https://lucky-number.net', 
	methods: ['GET', 'POST', 'PUT', 'DELETE'], 
	allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

app.use(express.static(path.join(__dirname, 'public')));

// v1 api route

app.use('/v1', routes);

app.get('/cryptomus_a2c0610a.html', (req, res) => {
	console.log(req.headers);
	console.log('get');
	console.log(req.ip);
	res.sendFile(path.join(__dirname, 'public', 'cryptomus.html'));
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post(`/bot${encodeURIComponent(process.env.BOT_TOKEN)}`, async (req, res) => {
	try{
		const userIp = req.headers['x-forwarded-for'] || req.ip;
		req.body.userIp = userIp;
		await bot.handleUpdate(req.body);
		res.sendStatus(200); 
	} catch (error) {
		console.log(error)
	}
});

app.post('/callback-invoce', internalMiddleware.checkInternalToken, paymentController.callbackInvoice);

app.post('/callback-payout', internalMiddleware.checkInternalToken, payoutController.callbackPayout);

// init socket
initSocket(io);

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
server.listen(PORT, () => {
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