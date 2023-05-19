const {Topic} = require('../models/models')
const ApiError = require('../error/ApiError');

class TopicController {
    async create(req, res) {
        const {name} = req.body
        const topic = await Topic.create({name})
        return res.json(topic)
    }

    async getAll(req, res) {
        const topics = await Topic.findAll()
        return res.json(topics)
    }

}

module.exports = new TopicController()