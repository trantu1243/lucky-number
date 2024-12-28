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
    return Payment.findOne({'userId': user, 'payment_status': 'check'}, 'address address_qr_code amount expired_at payment_status url network currency');
}

const cancelPaymentByUserId = async (user) => {
    return Payment.findOneAndUpdate({userId: user, payment_status: 'check'}, {payment_status: 'cancel'});
}

const findPaymentById = async (id) => {
    return Payment.findById(id).populate('userId', 'userId');
}

module.exports = {
    createPayment,
    findPaymentByOrderId,
    checkPaymentByUserId,
    cancelPaymentByUserId,
    findPaymentById
}