const { History } = require("../models");

const createHistory = async (historyBody) => {
    const history = await History.create(historyBody);
    return history;
};

const getHistoryByUserId = async (userId, page = 1, limit = 3) => {
    const skip = (page - 1) * limit;
    const histories = await History.find({ userId })
        .skip(skip)
        .limit(limit)
        .sort({ playedAt: -1 });
    return histories;
};

module.exports = {
    createHistory,
    getHistoryByUserId
}