const express = require('express');
const validateTelegramData = require('../middlewares/validateTelegramData.middleware');
const { payoutController } = require('../controllers');

const router = express.Router();

router.post('/add-payout', validateTelegramData, payoutController.addPayoutAddress);

router.post('/get-payout-address', validateTelegramData, payoutController.getPayoutAddress);


module.exports = router;