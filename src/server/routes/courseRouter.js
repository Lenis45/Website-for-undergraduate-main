const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/', courseController.getAll)
router.get('/:id', courseController.getOne)

module.exports = router