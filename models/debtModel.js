const mongoose = require('mongoose')

const DebtSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        enum: ["regular diesel", "processed diesel", "super diesel", "regular gasoline", "super gasoline", "kerosine"],
        default: "regular gasoline",
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    unitPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalValue: {
        type: Number,
        default: function() {
            return (this.amount * this.unitPrice).toFixed(2)
        }
    }

}, {
    timestamps: true,
})

module.exports = DebtSchema
