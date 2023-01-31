const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    enrollment:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    Questions: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.Model('User', UserSchema);

module.exports = User