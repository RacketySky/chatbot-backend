const { response } = require('express');
const questionService = require('../services/question.service')

const create = async (req, res) => {
    try {
        const { statement, tips, type, period, solution } = req.body

        if (!statement || !tips || !type || !period || !solution) {
            res.status(400).send({ message: "Fill all filds for registration" });
        }

        const question = await questionService.create(req.body);

        if (!question) {
            return res.status(400).send({ message: "Error creating new question" });
        }

        res.status(201).send({ message: "Question created", id: question._id });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const questions = await questionService.findAll(offset, limit);
        const total = await questionService.count();
        const currentUrl = req.baseUrl;

        const next = offset + limit < total ? offset + limit : null;
        const prev = offset - limit >= 0 ? offset - limit : null;
        const nextUrl = next != null ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
        const prevUrl = prev != null ? `${currentUrl}?limit=${limit}&offset=${prev}` : null;

        if (questions.length === 0) {
            return res.status(200).send({ message: "There are no news registered" });
        }

        return res.status(200).send({
            nextUrl,
            prevUrl,
            limit,
            offset,
            total,
            result: questions.map(question => ({
                id: question._id,
                tips: question.tips,
                type: question.type,
                period: question.period,
                solution: question.solution
            }))
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const findById = async (req, res) => {
    try {

        const question = await questionService.findById(req.params.id);
        if (!question) {
            return res.status(404).send({ message: "Questioin not found" });
        }

        return res.status(200).send({
            question: {
                id: question._id,
                tips: question.tips,
                type: question.type,
                period: question.period,
                solution: question.solution
            }
        });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const update = async (req, res) => {
    try {
        const { tips, type, period, solution } = req.body;
        const { id } = req.params;

        if (!tips && !type && !period && !solution) {
            return res.status(400).send({ message: "Submit at the last one field for update" });
        }

        const question = await questionService.findById(id);

        // if (String(news.user._id) !== req.userId) {
        //     return res.status(400).send({ message: "You didn't update this post" });
        // }

        await questionService.update(
            id,
            tips,
            type,
            period,
            solution
        )
        return res.status(200).send({ message: "Question updated successfully" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const returnOne = async (req, res) => {
    try {
        const type = req.query.type;

        if (!type) {
            res.status(404).send({ message: "You must be inform type of the question" })
        }

        const questions = await questionService.findByType(type);
        // console.log(questions.length);
        const num = Math.floor(Math.random() * ((questions.length - 1) - 0 + 1)) + 0;

        const question = questions[num]

        res.status(200).send({ question })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    returnOne
}