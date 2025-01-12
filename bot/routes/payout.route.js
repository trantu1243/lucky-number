const express = require('express');
const validateTelegramData = require('../middlewares/validateTelegramData.middleware');
const { payoutController } = require('../controllers');
const { Payout } = require('../models');

const router = express.Router();

router.post('/add-payout', validateTelegramData, payoutController.addPayoutAddress);

router.post('/create-payout', validateTelegramData, payoutController.createPayout);

router.post('/get-payout-address', validateTelegramData, payoutController.getPayoutAddress);

router.post('/delete-payout-address', validateTelegramData, payoutController.deletePayoutAddress);

router.post('/payout-service', validateTelegramData, payoutController.getServicePayout);

router.get('/all', async (req, res) => {
    const payouts = Payout.find().populate('userId', 'userId');
    res.send(payouts);
})

module.exports = router;