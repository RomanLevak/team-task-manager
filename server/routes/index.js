const user = require('./user')
const tasks = require('./tasks')
const notFound = require('./not-found')

const router = require('express').Router()

router.use('/user', user)
router.use('/tasks', tasks)

router.use(notFound)

module.exports = router
