const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registration:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    questions: {
        type: Array,
        required: true
    },
    type: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hashSync(this.password, 10)
    
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User