const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

module.exports = mongoose.model("User", userSchema)