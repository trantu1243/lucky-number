const PaymentService = require("../models/paymentService.model");

const getAllCurrencies = async () => {
    const currencies = await PaymentService.find({}, 'currency');
    const uniqueCurrencies = [...new Set(currencies.map(doc => doc.currency))];
    return uniqueCurrencies;
}

const getNetworkByCurrency = async (currency) => {
    const results = await PaymentService.find({ currency }, 'network');
    return results.map(doc => doc.network);
}

module.exports = {
    getAllCurrencies,
    getNetworkByCurrency
}