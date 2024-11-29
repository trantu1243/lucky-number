const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["recharge", "withdraw"],
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["success", "pending", "failure"],
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

/**
 * @typedef Transaction
 */
const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;