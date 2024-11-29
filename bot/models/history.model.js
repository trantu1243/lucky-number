const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    game: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        enum: ["win", "lose"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    playedAt: {
        type: Date,
        default: Date.now,
    },
});

/**
 * @typedef History
 */
const History = mongoose.model('history', historySchema);

module.exports = History;