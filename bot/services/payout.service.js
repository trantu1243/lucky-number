const { Payout } = require("../models");

const createPayout = async (payoutBody) => {
    const payout = await Payout.create(payoutBody);
    return payout;
};

const findPayoutByOrderId = async (order_id) => {
    return Payout.findOne({'order_id': order_id}).populate('userId', 'userId');
}

module.exports = {
    createPayout,
    findPayoutByOrderId
}