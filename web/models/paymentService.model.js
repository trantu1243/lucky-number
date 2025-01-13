const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const paymentServiceSchema = mongoose.Schema(
    {
        currency: {
            type: String,
            required: true,
        },
        network: {
            type: String,
            required: true,
        },
        is_available: {
            type: Boolean,
            required: true, 
        },
        limit: {
            min_amount: {
                type: String,
                required: true,
            },
            max_amount: {
                type: String,
                required: true,
            }
        },
        commission: {
            fee_amount: {
                type: String,
                required: true,
            },
            percent: {
                type: String,
                required: true,
            }
        }
    },
    {
        timestamps: true,
    }
);

/**
 * @typedef PaymentService
 */
const PaymentService = mongoose.model('paymentService', paymentServiceSchema);

module.exports = PaymentService;