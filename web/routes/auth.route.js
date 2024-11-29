const express = require('express');
const { Admin } = require('../models');
const router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.send('Admin not found');
        }
        const isValidPassword = await admin.validatePassword(password);
        if (!isValidPassword) {
            return res.send('Invalid password');
        }
        req.session.admin = admin;
        res.redirect('/');
    } catch (error) {
        res.send('Error: ' + error.message);
    }
  });
  
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;