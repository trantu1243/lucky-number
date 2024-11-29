const mongoose = require('mongoose');

const dailyTaskSchema = mongoose.Schema({
    rank: {
        type: Number,
        required: true,
    },
    milestone: {
        type: Number,
        required: true,
    },
    reward: {
        type: Number,
        required: true,
    },
});

/**
 * @typedef DailyTask
 */
const DailyTask = mongoose.model('dailyTask', dailyTaskSchema);

module.exports = DailyTask;