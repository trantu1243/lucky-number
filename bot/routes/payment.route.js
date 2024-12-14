const express = require('express');
const { paymentController } = require('../controllers');


const router = express.Router();

router.post('/create-payment', validateTelegramData, paymentController.createPayment);

module.exports = router;