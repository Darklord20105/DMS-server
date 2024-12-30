const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 100,
        default: "cash"
    },
    totalValue: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})

module.exports = PaymentSchema;
