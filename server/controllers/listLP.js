const listLongpolling = require('../libs/list-longpolling')

const subscribe = (req, res, next) =>
    listLongpolling.subscribe(req, res)

const publish = (req, res, next) =>
    listLongpolling.publish(res.taskToPublish)

module.exports = {
    subscribe,
    publish
}
