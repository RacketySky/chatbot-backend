const User = require('../models/User');
const jwt = require('jsonwebtoken');


const login = (email) => User.findOne({ email }).select("+password");

const generateToken = (id) => jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '24h' });


module.exports = { login, generateToken }