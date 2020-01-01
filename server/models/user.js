const mongoose = require('../libs/mongoose')
const {Schema} = mongoose
const crypto = require('crypto')
const config = require('config')

const userSchema = new Schema({
    email: {
        type: String,
        required: 'Email cannot be blank',
        validate: [{
            validator(value) {
                return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value)
            },
            message: 'Incorrect email'
        }],
        unique: 'This email already exists'
    },

    passwordHash: {
        type: String,
        required: true
    },

    salt: {
        required: true,
        type: String
    }
}, {timestamps: true})

userSchema.methods.generatePassword = function(salt, plainPassword) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            plainPassword,
            salt,
            config.get('crypto.hash.iterations'),
            config.get('crypto.hash.length'),
            'sha512',
            (err, key) => {
                if(err) return reject(err)

                resolve(key.toString('hex'))
            }
        )
    })
}

userSchema.methods.setPassword = async function(plainPassword) {

    this.salt = crypto.randomBytes(
        config.get('crypto.hash.length')
    ).toString('hex')

    this.passwordHash = await this.generatePassword(this.salt, plainPassword)
}

userSchema.methods.checkPassword = async function(plainPassword) {
    if(!plainPassword) return false

    const passwordHash = await this.generatePassword(this.salt, plainPassword)

    return passwordHash === this.passwordHash
}

userSchema.methods.selectToSend = function() {
    return {
        email: this.email,
        id: this._id
    }
}

userSchema.statics.selectToSendArr = function(users) {
    return users.map(
        user => user.selectToSend()
    )
}

userSchema.statics.getIdByEmail = async function(email) {
    const user = await this.findOne({email: {
        // case insensitive search
        $regex: new RegExp(email, 'i')
    }})

    if(!user)
        return null

    return user.id
}

userSchema.statics.getEmailById = async function(id) {
    const user = await this.findById(id)

    if(!user)
        return null

    return user.email
}

module.exports = mongoose.model('User', userSchema)
