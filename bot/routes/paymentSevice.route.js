const express = require('express');
const { paymentSeriveController } = require('../controllers');

const router = express.Router();

router.get('/currencies', paymentSeriveController.getAllCurrencies);

router.get('/networks/:currency', paymentSeriveController.getNetworkByCurrency);

module.exports = router;