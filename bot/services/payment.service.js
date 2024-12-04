const { Payment } = require("../models");

const createPayment = async (paymentBody) => {
    const payment = await Payment.create(paymentBody);
    return payment;
};

const findPaymentByOrderId = async (order_id) => {
    return Payment.findOne({'order_id': order_id}).populate('userId', 'userId');
}

module.exports = {
    createPayment,
    findPaymentByOrderId
}