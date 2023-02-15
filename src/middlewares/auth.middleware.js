const dotenv = require('dotenv');
const jtw = require('jsonwebtoken')
const userService = require('../services/user.service');


dotenv.config();

const authMiddleware = (req, res, next) => {
    try {

        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const parts = authorization.split(' ');

        if (parts.length !== 2) {
            return res.status(401).send({ message: "the token must contain two parts" });
        }

        const [schema, token] = parts

        if (schema !== 'Bearer') {
            return res.status(401).send({ message: "Badly formatted token" });
        }

        jtw.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Invalid Token or expired" });
            }

            const user = await userService.findByID(decoded.id);
            // console.log(user);

            if (!user) {
                return res.status(401).send({ message: "Invalid User on Token" });
            }

            req.userId = decoded.id;
            // console.log(req.userId);

            next();
        })


    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { authMiddleware }