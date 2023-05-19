const Router = require('express')
const router = new Router()
const courseRouter = require('./courseRouter')
const userRouter = require('./userRouter')
const topicRouter = require('./topicRouter')
const purposeRouter = require('./purposeRouter')

router.use('/user', userRouter)
router.use('/purpose', purposeRouter)
router.use('/topic', topicRouter)
router.use('/course', courseRouter)

module.exports = router
