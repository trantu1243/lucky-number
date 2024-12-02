const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const checkInternalToken = require('./middleware/internal');
const CryptoJS = require('crypto-js');
const axios = require('axios');

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
	const body = {
		amount: req.body.amount,
		currency: req.body.currency,
		order_id: req.body.order_id,
		network: req.body.network,
		lifetime: req.body.lifetime
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

app.post('/callback-invoice', (req, res) => {

})

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});