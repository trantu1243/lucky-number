const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

historySchema.plugin(mongoosePaginate);
/**
 * @typedef History
 */
const History = mongoose.model('history', historySchema);

module.exports = History;