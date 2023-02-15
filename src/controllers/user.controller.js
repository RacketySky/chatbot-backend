const userService = require('../services/user.service')

const create = async (req, res) => {
    try {
        const { name, email, password, registration } = req.body

        if (!name || !email || !password || !registration) {
            res.status(400).send({ message: "Fill all filds for registration" });
        }

        const user = await userService.create(req.body);

        if (!user) {
            return res.status(400).send({ message: "Error creating new user" });
        }

        res.status(201).send({ message: "User created", id: user._id });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const findAll = async (req, res) => {
    try {
        const users = await userService.findAll();

        if (users.lenght === 0) {
            return res.status(400).send({ message: "There no has users registared" });
        }

        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findById = async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


const update = async (req, res) => {
    try {
        const { name, email, password, registration, type } = req.body;

        const id = req.id

        if (!name && !email && !password && !registration && !type) {
            res.status(400).send({ message: "Submit at the last one field for update" });
        }

        await userService.update(id, name, email, password, registration, type);

        res.status(200).send({ message: "User successfully updated" })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}

const addQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { time } = req.body

        await userService.addQuestion(id, userId, time);

        res.status(200).send({ message: "Question added successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { create, findAll, findById, update, addQuestion }