const {
    getOthers,
    login,
    logout,
    register,
    getSelf,
    checkAuth
} = require('../controllers/user')

const router = require('express').Router()

router.get('/others', checkAuth, getOthers)
router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register, login)
router.get('/me', getSelf)

module.exports = router
