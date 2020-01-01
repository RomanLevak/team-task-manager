let users = []
let usersToPublish = []

const listLongpolling = {
    subscribe: (req, res) => {
        users.push({req, res})
        res.on('close', function() {
            users.splice(users.indexOf(res), 1)
        })
    },
    publish: task => {
        const ownerId = task.user.id
        const sharedWithIds = task.sharedWith.map(u => u.id.toString())

        // only task owner or users in sharedWith array will be published
        usersToPublish = users.filter(u =>
            [ownerId, ...sharedWithIds].includes(u.req.user.id)
        )

        usersToPublish.forEach(u =>
            u.res.json({})
        )

        users = users.filter(u =>
            ![ownerId, ...sharedWithIds].includes(u.req.user.id)
        )

        usersToPublish = []
    }
}

module.exports = listLongpolling
