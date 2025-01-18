const express = require('express');
const validateTelegramData = require('../middlewares/validateTelegramData.middleware');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/', validateTelegramData, userController.getUserInfo);

router.post('/send-code', validateTelegramData, userController.sendCode);

router.post('/verify-code', validateTelegramData, userController.verifyCode);

module.exports = router;