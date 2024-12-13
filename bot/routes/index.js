const express = require('express');
const userRoute = require('./user.route');
const paymentServiceRoute = require('./paymentSevice.route');

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
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;