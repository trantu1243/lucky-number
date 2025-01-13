const express = require('express');
const { User } = require('../models');
const { authMiddleware } = require('../middlewares');
const router = express.Router();

router.get('/', authMiddleware, async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const users = await User.paginate({}, { page, limit }, function (err, result) {
        return result;
    });
    res.render('user/index', { users });
});

module.exports = router;