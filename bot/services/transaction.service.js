const { Transaction } = require("../models");

const createTransaction = async (transactionBody) => {
    const transaction = await Transaction.create(transactionBody);
    return transaction;
};

const getTransactionByUserId = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const histories = await Transaction.find({ userId })
        .skip(skip)
        .limit(limit);
    return histories;
};

module.exports = {
    createTransaction,
    getTransactionByUserId
}