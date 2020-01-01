const Task = require('../models/task')
const {ObjectID} = require('mongodb')
const HTTPError = require('../libs/http-error')
const ah = require('../libs/async-handler')

/*
 * calls next middleware if current user has access
 * to requested task (if task is shared with him or
 * if he is the owner)
 */
const checkAccess = ah(async (req, res, next) => {
    const taskId = req.params.id
    const userId = req.user.id

    const task = await Task.findById(taskId)

    if(task && (
        task.user.toString() == userId ||
        task.sharedWith.includes(userId)
    ))
        return next()

    next(new HTTPError(401, 'You do not have such task'))
})

// returns all current users tasks and tasks which is shared him
const getAll = ah(async (req, res, next) => {
    const {id} = req.user

    const tasks = await Task.find({$or: [
        {user: ObjectID(id)},
        {sharedWith: id}
    ]})

    const tasksToSend = await Task.selectToSendArr(tasks)

    return res.json(tasksToSend)
})

const getById = ah(async (req, res, next) => {
    const {id} = req.params

    const task = await Task.findById(id)

    const taskToSend = await task.selectToSend()

    return res.json(taskToSend)
})

const updateContent = ah(async (req, res, next) => {
    const {id} = req.params
    const {content} = req.body

    const changedTask = await Task.findOneAndUpdate(
        {_id: id},
        {$set: {content}},
        {new: true} // return updated doc
    )

    if(!changedTask)
        return next(HTTPError(404, 'Such task does not exist'))

    res.taskToPublish = await changedTask.selectToSend()

    next()
})

const share = ah(async (req, res, next) => {
    const taskId = req.params.id
    const {userId} = req.params

    const changedTask = await Task.findOneAndUpdate(
        {_id: taskId},
        {$addToSet: {sharedWith: userId}},
        {new: true} // return updated doc
    )

    res.taskToPublish = await changedTask.selectToSend()

    next()
})

const remove = ah(async (req, res, next) => {
    const {id} = req.params

    const changedTask = await Task.findOneAndDelete({_id: id})

    if(!changedTask)
        return next(new HTTPError(404, 'Such task does not exist'))

    res.taskToPublish = await changedTask.selectToSend()

    next()
})

const create = ah(async (req, res, next) => {
    const newTask = await Task.create({user: req.user.id})

    res.taskToPublish = await newTask.selectToSend()
    next()
})

module.exports = {
    getAll,
    getById,
    checkAccess,
    create,
    updateContent,
    share,
    remove
}
