const mongoose = require('mongoose');
const { message } = require('telegraf/filters');

const paymentSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        order_id: {
            type: String,
            required: true,
        },
        uuid: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        network: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        merchant_amount: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        expired_at: {
            type: Number,
        },
        payment_status: {
            type: String,
            enum: ["paid", "paid_over", "wrong_amount", "process", "confirm_check", "wrong_amount_waiting", "check", "fail", "cancel", "system_fail", "refund_process", "refund_fail", "refund_paid", "locked"],
            required: true,
        },
        address_qr_code: {
            type: String,
            required: true,
        },
        mercuryo_payment_link: {
            type: String,
        },
        message_id: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

/**
 * @typedef Payment
 */
const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;