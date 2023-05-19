const uuid = require('uuid')
const path = require('path');
const {Course, CourseInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class CourseController{
    async create(req, res, next) {
        try {
            const {name, price, topicId, purposeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const course = await Course.create({name, price, topicId, purposeId, img:fileName})

             if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    CourseInfo.create({
                        title: i.title,
                        description: i.description,
                        CourseId: course.id
                    })
                )
             }
            return res.json(course)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req,res) {
        let {topicId, purposeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let courses;
        if (!topicId && !purposeId){
            courses = await Course.findAndCountAll({limit, offset})
        }
        if (topicId && !purposeId){
            courses = await Course.findAndCountAll({where: {topicId}, limit, offset})
        }
        if (!topicId && purposeId){
            courses = await Course.findAndCountAll({where: {purposeId}, limit, offset})
        }
        if (topicId && purposeId){
            courses = await Course.findAndCountAll({where: {purposeId, topicId}, limit, offset})
        }

        return res.json(courses)
    }

    async getOne(req,res) {
        const {id} = req.params
        const course = await Course.findOne(
            {
                where: {id},
                include: [{model: CourseInfo, as: 'info'}]
            },
        )
        return res.json(course)
    }
}

module.exports = new CourseController()