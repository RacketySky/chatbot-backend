const User = require('../models/User');

const create = (body) => User.create(body)

const findAll = () => User.find()

const findByID = (id) => User.findById(id)

const update = (id, name, email, password, registration, type) => User.findOneAndUpdate({ _id: id }, { name, email, password, registration, type })

const addQuestion = (idQuestion, userId, time) => User.findOneAndUpdate(
    { _id: userId },
    { $push: { questions: { idQuestion, time, createdAt: new Date() } } }
)

module.exports = { create, findAll, findByID, update, addQuestion }