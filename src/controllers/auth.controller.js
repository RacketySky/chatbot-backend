const bcrypt = require('bcryptjs')

const loginService = require('../services/auth.service')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await loginService.login(email);

        if (!user) {
            return res.status(404).send({ message: 'Invalid email or password.' })
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(400).send({ message: "Password does not match" })

        }

        const token = loginService.generateToken(user.id);

        res.status(200).send({
            user: user.name, 
            token: token
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { login }