const {
    getAll,
    getById,
    checkAccess,
    create,
    updateContent,
    share,
    remove
} = require('../controllers/tasks')
const {subscribe, publish} = require('../controllers/listLP')
const {checkAuth} = require('../controllers/user')
const checkId = require('../middlewares/check-id')

const router = require('express').Router()

router.route('/')
    .get(checkAuth, getAll)
    .post(checkAuth, create, publish)

router.get('/subscribe', checkAuth, subscribe)

router.put(
    '/:id/:userId',
    checkId, checkAuth, checkAccess, share, publish
)

router.route('/:id')
    .get(checkId, checkAuth, checkAccess, getById)
    .put(checkId, checkAuth, checkAccess, updateContent, publish)
    .post(checkAuth, create, publish)
    .delete(checkId, checkAuth, checkAccess, remove, publish)

module.exports = router
