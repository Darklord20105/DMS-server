const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");
const DebtSchema = require("./debtModel");
const PaymentSchema = require("./paymentModel")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 100,
        unique: true,
    },
    jobTitle: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 100,
    },

    debtList: [DebtSchema],

    paymentList: [PaymentSchema],

    totalDebt: {
        type: Number,
        default: 0,
    },

    totalPayment: {
        type: Number,
        default: 0,
    },

    overallValue: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
//UserSchema.plugin(uniqueValidator);

const User = mongoose.model("user", UserSchema);

module.exports = User;
