const PaymentService = require("../models/paymentService.model");

const getAllCurrencies = async () => {
    const currencies = await PaymentService.find({}, 'currency');
    return currencies.map(doc => doc.currency);

}

const getNetworkByCurrency = async (currency) => {
    const results = await PaymentService.find({ currency }, 'network');
    return results.map(doc => doc.network);
}

module.exports = {
    getAllCurrencies,
    getNetworkByCurrency
}