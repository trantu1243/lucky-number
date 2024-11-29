const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', async function(req, res, next) {
    res.render('index');
});

module.exports = router;