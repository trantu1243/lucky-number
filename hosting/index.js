const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const checkInternalToken = require('./middleware/internal');
const CryptoJS = require('crypto-js');
const axios = require('axios');
const { CronJob } = require('cron');
const { PaymentService } = require('./models');
require('dotenv').config();

const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN;


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/sign-up', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'sign-up.html'));
});

app.get('/cryptomus_0d0dd028.html', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'cryptomus.html'));
});

app.post('/create-invoice', checkInternalToken, (req, res) => {
	const URL = process.env.URL;
	const API_KEY = process.env.API_KEY;
	const body = {
		amount: req.body.amount,
		currency: req.body.currency,
		order_id: req.body.order_id,
		network: req.body.network,
		url_callback: `${URL}/callback-invoice-bc40-c903cb794d97-0d0dd028-c61b-4aa6`,
		lifetime: req.body.lifetime,
	};

	const data = JSON.stringify(body);
	const base64Data = Buffer.from(data).toString('base64');
	const sign = CryptoJS.MD5(base64Data + API_KEY).toString();

	const url = 'https://api.cryptomus.com/v1/payment';
	const headers = {
		merchant: '0d0dd028-c61b-4aa6-bc40-c903cb794d97',
		sign: sign,
		'Content-Type': 'application/json',
	};

	axios
		.post(url, data, { headers })
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).send(error);
		});
});

app.post('/callback-invoice-bc40-c903cb794d97-0d0dd028-c61b-4aa6', (req, res) => {
	console.log(req.body);
	const url = `${process.env.LN_URL}/callback-invoce`;
	const headers = {
		'x-internal-token': INTERNAL_TOKEN
	};

	axios
		.post(url, req.body, { headers })
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).send(error);
		});

})

app.post('/create-payout', checkInternalToken, (req, res) => {
	const URL = process.env.URL;
	const API_KEY = process.env.API_KEY;
	const body = {
		amount: req.body.amount,
		currency: req.body.currency,
		order_id: req.body.order_id,
		network: req.body.network,
		url_callback: `${URL}/callback-payout-bc40-c903cb794d97-0d0dd028-c61b-4aa6`,
		is_subtract: "1",
	};

	const data = JSON.stringify(body);
	const base64Data = Buffer.from(data).toString('base64');
	const sign = CryptoJS.MD5(base64Data + API_KEY).toString();

	const url = 'https://api.cryptomus.com/v1/payout';
	const headers = {
		merchant: '0d0dd028-c61b-4aa6-bc40-c903cb794d97',
		sign: sign,
		'Content-Type': 'application/json',
	};

	axios
		.post(url, data, { headers })
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).send(error);
		});
});

app.post('/callback-payout-bc40-c903cb794d97-0d0dd028-c61b-4aa6', (req, res) => {
	console.log(req.body);
	const url = `${process.env.LN_URL}/`;
	const headers = {
		'x-internal-token': INTERNAL_TOKEN
	};

	axios
		.post(url, req.body, { headers })
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).send(error);
		});

})

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const getPaymentService = async () => {
	const API_KEY = 'AfU4DTD9OFYbPYlGol692R5LWSZpAZ2GWkJObaa7AHWL5bEGMepPzSPeVDcd0WwzRQ7dBdb8Cjf0tcoBjTwxaoUzhumEmIlpToUDPA151zty4sO15KPAzMCNOeMlq4ZH';
	const body = {};

	const data = JSON.stringify(body);
	const base64Data = Buffer.from(data).toString('base64');
	const sign = CryptoJS.MD5(base64Data + API_KEY).toString();

	const url = 'https://api.cryptomus.com/v1/payment/services';
	const headers = {
		merchant: '0d0dd028-c61b-4aa6-bc40-c903cb794d97',
		sign: sign,
		'Content-Type': 'application/json',
	};
	try {
		const response = await axios.post(url, data, { headers });
		console.log(response.data);
		response.data.result.forEach(async (value) => {
			const paymentService = await PaymentService.findOneAndUpdate(
				{ currency: value.currency, network: value.network },
				value, 
				{ upsert: true, new: true, setDefaultsOnInsert: true } 
			);
		});
	} 
	catch (error) {
		console.log(error);
	}
}

const job = new CronJob(
	'0 0 * * *', 
	function () {
		getPaymentService()	
	}, // onTick
	null, // onComplete
	true, // start
	'Europe/London' // timeZone
);