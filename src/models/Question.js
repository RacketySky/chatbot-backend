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
        type: Number,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    explanation: {
        type: String
    }
}, { timestamps: true })

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;