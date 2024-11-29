const { DailyTask, User } = require("../models");

const createDailyTask = async (dailyTaskBody) => {
    return DailyTask.create(dailyTaskBody);
}

const getDailyTask = async () => {
    return DailyTask.find().sort({ rank: 1 });
};

const resetDailyTask = async () => {
    const tasks = await getDailyTask();
    const userTask = tasks.map((value) => {
        return {milestone: value.milestone, reward: value.reward,completed: false}
    });

    await User.updateMany({}, {dailyTask: userTask})
    .then(result => {
    })
    .catch(error => {
        console.error('Reset Error:', error);
    });
}

module.exports = {
    createDailyTask,
    getDailyTask,
    resetDailyTask
}