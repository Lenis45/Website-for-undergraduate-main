const {Purpose} = require('../models/models')
const ApiError = require('../error/ApiError');

class PurposeController {
    async create(req, res) {
        const {name} = req.body
        const Purpose = await Purpose.create({name})
        return res.json(purpose)
    }

    async getAll(req, res) {
        const purposes = await Purpose.findAll()
        return res.json(purposes)
    }

}

module.exports = new PurposeController()