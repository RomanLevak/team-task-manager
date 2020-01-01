const User = require('../models/user')
const Task = require('../models/task')
const users = require('./users')
const tasks = require('./tasks')

async function fillDB() {
    try {
        await User.deleteMany()
        await Task.deleteMany()

        for(let user of users) {
            const u = new User(user)
            await u.setPassword(user.password)
            await u.save()
        }

        for(let task of tasks) {
            const t = new Task(task)
            const u = await User.findOne({email: task.userEmail})
            let ids = []

            if(task.sharedWith)
                ids = await Promise.all(task.sharedWith.map(
                    email => User.getIdByEmail(email)
                ))

            t.user = u._id
            t.sharedWith = ids
            await t.save()
        }

        console.log(`${users.length} users with ${tasks.length} tasks have been saved to DB`)
    } catch (err) {
        console.error(err)
    }
}

fillDB()
