const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const payoutSchema = mongoose.Schema(
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
        chip: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["process", "check", "paid", "fail", "cancel", "system_fail"],
            required: true,
        },
        check: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

payoutSchema.plugin(mongoosePaginate);
/**
 * @typedef Payout
 */
const Payout = mongoose.model('payout', payoutSchema);

module.exports = Payout;