const mongoose = require('../libs/mongoose')
const {Schema} = mongoose

const taskSchema = new Schema({

    content: {
        type: String,
        default: ''
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    sharedWith: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true})

taskSchema.statics.selectToSendArr = async function(tasks) {
    return await Promise.all(tasks.map(
        async task => await task.selectToSend()
    ))
}

taskSchema.methods.selectToSend = async function() {
    await this.populate('user')
        .populate('sharedWith')
        .execPopulate()

    const sharedWith = this.sharedWith.map(user => user.selectToSend())

    return {
        sharedWith,
        id: this._id,
        user: {
            email: this.user.email,
            id: this.user.id
        },
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

module.exports = mongoose.model('Task', taskSchema)
