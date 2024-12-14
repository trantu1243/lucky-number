const express = require('express');
const { paymentSeriveController } = require('../controllers');
const PaymentService = require('../models/paymentService.model');

const router = express.Router();

router.get('/currencies', paymentSeriveController.getAllCurrencies);

router.get('/networks/:currency', paymentSeriveController.getNetworkByCurrency);

router.get('/all', async (req, res) => {
    const all = await PaymentService.find({});
    res.send(all);
});


module.exports = router;