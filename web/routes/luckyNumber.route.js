const express = require('express');
const { LuckyNumber } = require('../models');
const { authMiddleware } = require('../middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {

    const luckyNumber = await LuckyNumber.findOne({uuid: '0011'});
    console.log(luckyNumber);
    res.render('luckyNumber/index', { luckyNumber });
});

module.exports = router;