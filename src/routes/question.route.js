const route = require('express').Router()
const questionController = require('../controllers/question.controller')

const { authMiddleware } = require('../middlewares/auth.middleware');

route.post('/', questionController.create)
route.get('/', questionController.findAll)
route.get('/random', questionController.returnOne)
route.get('/:id', questionController.findById)
route.patch('/:id', authMiddleware, questionController.update)

module.exports = route;