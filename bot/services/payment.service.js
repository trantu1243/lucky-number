const { Payment } = require("../models");

const createPayment = async (paymentBody) => {
    const payment = await Payment.findOne({order_id: paymentBody.order_id});
    if (payment) return payment;
    const newPayment = await Payment.create(paymentBody);
    return newPayment;
};

const findPaymentByOrderId = async (order_id) => {
    return Payment.findOne({'order_id': order_id}).populate('userId', 'userId');
}

const checkPaymentByUserId = async (user) => {
    return Payment.findOne({'userId': user, 'payment_status': 'cancel'}, 'address address_qr_code amount expired_at payment_status url network currency');
}

module.exports = {
    createPayment,
    findPaymentByOrderId,
    checkPaymentByUserId
}