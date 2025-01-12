const { Payout } = require("../models");

const createPayout = async (payoutBody) => {
    const payout = await Payout.findOne({order_id: payoutBody.order_id});
    if (payout) return payout;
    const newPayout = await Payout.create(payoutBody);
    return newPayout;
};

const findPayoutByOrderId = async (order_id) => {
    return Payout.findOne({'order_id': order_id}).populate('userId', 'userId');
}

module.exports = {
    createPayout,
    findPayoutByOrderId
}