const express = require('express');
const { paymentController } = require('../controllers');
const validateTelegramData = require('../middlewares/validateTelegramData.middleware');

const router = express.Router();

router.post('/create-payment', validateTelegramData, paymentController.createPayment);

router.post('/check', validateTelegramData, paymentController.checkPayment);

router.post('/cancel', validateTelegramData, paymentController.cancelPayment);

module.exports = router;