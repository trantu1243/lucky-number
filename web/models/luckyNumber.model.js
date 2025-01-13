const mongoose = require('mongoose');

const luckyNumberSchema = new mongoose.Schema({
    uuid: { 
        type: String, 
        unique: true 
    },
    arr1: {
        type: [String],
        default: ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90']
    },
    arr2: {
        type: [String],
        default: ['11', '12', '13', '14', '15', '16', '17']
    },
    arr3: {
        type: [String],
        default: ['18', '28', '38', '48', '58']
    },
    arr4: {
        type: [String],
        default: ['33', '77', '88']
    },
});

const LuckyNumber = mongoose.model('luckyNumber', luckyNumberSchema);

module.exports = LuckyNumber;
