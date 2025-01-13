const mongoose = require('mongoose');
const { userLevels } = require('../configs/user');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        usd: {
            type: Number,
            required: true,
            default: 0
        },
        experience: {
            type: Number,
            required: true,
            default: 0
        },
        level: {
            type: String,
            enum: userLevels,
            default: userLevels.Beginner
        },
        charged: {
            type: Boolean,
            default: false
        },
        won: {
            type: Number,
            default: 0
        },
        amountDeposited: {
            type: Number,
            default: 0
        },
        amountWithdrawn: {
            type: Number,
            default: 0
        },
        dailyDeposit: {
            type: Number,
            default: 0
        },
        weeklyDeposit: {
            type: Number,
            default: 0
        },
        invitation: {
            type: Number,
            default: 0,
        },
        dailyTask: [{
            milestone: {
                type: Number,
                required: true,
            },
            reward: {
                type: Number,
                required: true,
            },
            completed: {
                type: Boolean,
                default: false
            }
        }],
        active: {
            type: Boolean,
            default: true
        },
        payment_time: {
            type: Number,
            default: Math.floor(Date.now() / 1000)
        },
        payout_time: {
            type: Number,
            default: Math.floor(Date.now() / 1000)
        },
        payout_address: [{
            address: {
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
            }
        }],
        socketId: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
    }
);

userSchema.statics.isUserIdTaken = async function (userId, excludeUserId) {
    const user = await this.findOne({ userId, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.plugin(mongoosePaginate);
/**
 * @typedef User
 */
const User = mongoose.model('user', userSchema);

module.exports = User;