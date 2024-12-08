const express = require('express');
const validateTelegramData = require('../middlewares/validateTelegramData.middleware');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/', validateTelegramData, userController.getUserInfo);

module.exports = router;