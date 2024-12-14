const { paymentServiceService } = require("../services")

const getAllCurrencies = async (req, res) => {
    try{
        const currencies = await paymentServiceService.getAllCurrencies();
        res.send(currencies);
    }
    catch (e) {
        res.status(500);
    }
}

const getNetworkByCurrency = async (req, res) => {
    try {
        console.log(req.params)
        const networks = await paymentServiceService.getNetworkByCurrency(req.params.currency);
        res.send(networks);
    }
    catch {
        res.status(404)
    }
}

module.exports = {
    getAllCurrencies,
    getNetworkByCurrency
}