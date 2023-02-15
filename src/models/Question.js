const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    statement: {
        type: String,
        required: true,
    },
    tips: {
        type: Array,
        required: true,
    },
    type: {
        type: Number,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;