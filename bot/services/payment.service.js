const { Payment } = require("../models");

const createPayment = async (paymentBody) => {
    const payment = await Payment.create(paymentBody);
    return payment;
};

module.exports = {
    createPayment,
    getPaymentByUserId
}