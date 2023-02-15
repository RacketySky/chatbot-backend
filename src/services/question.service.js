const Question = require('../models/Question');

const create = (body) => Question.create(body);

const findAll = (offset, limit) => Question.find().sort({ _id: -1 }).skip(offset).limit(limit);

const count = () => Question.countDocuments();

const findById = (id) => Question.findById(id);

const findByType = (type) => Question.find({ type })

const update = (id, statement, tips, type, period, solution, explanation) => News.findOneAndUpdate(
    { _id: id },
    { statement, tips, type, period, solution, explanation },
    { rawResult: true }
);

const remove = (id) => News.findOneAndRemove({ _id: id });

module.exports = { create, findAll, findByType, count, findById, update, remove }