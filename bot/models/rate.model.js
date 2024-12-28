const mongoose = require('mongoose');

const rateSchema = mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            default: 'USDT'
        },
        course: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * @typedef Rate
 */
const Rate = mongoose.model('rate', rateSchema);

module.exports = Rate;