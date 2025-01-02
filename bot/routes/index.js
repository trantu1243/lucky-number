const express = require('express');
const userRoute = require('./user.route');
const paymentServiceRoute = require('./paymentSevice.route');
const paymentRoute = require('./payment.route');
const payoutRoute = require('./payout.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/payment-service',
    route: paymentServiceRoute,
  },
  {
    path: '/payment',
    route: paymentRoute
  },
  {
    path: '/payout',
    route: payoutRoute
  },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;