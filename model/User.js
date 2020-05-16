const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        min: 6,
        type: String
    },
    email: {
        required: true,
        min: 6,
        type: String
    },
    password: {
        required: true,
        min: 6,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', Userschema);
