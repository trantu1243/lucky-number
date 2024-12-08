const express = require('express');
const validateTelegramData = require('../middlewares/validateTelegramData.middleware');
const { userController } = require('../controllers');

const router = express.Router();

router.get('/', validateTelegramData, userController.getUserInfo);

module.exports = router;