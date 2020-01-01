const User = require('../models/user')
const validatePassword = require('../libs/validate-password')
const passport = require('../libs/passport')
const HTTPError = require('../libs/http-error')
const ah = require('../libs/async-handler')

// returns all users except logged user
const getOthers = ah(async (req, res, next) => {
    const users = await User.find({_id: {$ne: req.user.id}})
    res.json(User.selectToSendArr(users))
})

const login = (req, res, next) =>
    passport.authenticate(
        'local',
        (err, user, message) => {

            if(err)
                return next(err)

            if(user)
                req.login(user, ah(async err => {
                    if(err)
                        return next(err)

                    res.json(await user.selectToSend({
                        withEmail: true
                    }))
                }))
            else
                return next(new HTTPError(401, message))
        }
    )(req, res, next)

const logout = (req, res, next) => {
    req.logout()
    res.json(null)
}

const register = ah(async (req, res, next) => {
    const {email, password} = req.body
    let errorMsg = checkCredentials(email, password)

    if(errorMsg)
        return next(new HTTPError(400, errorMsg))

    const existEmail = await User.findOne({email})

    if(existEmail)
        return next(new HTTPError(409, 'such email already registred'))

    const user = new User({email, password})

    await user.setPassword(password)
    await user.save()

    next()
})

const checkCredentials = (email, password) => {
    if(!email)
        return 'please provide an email'

    if(!password)
        return 'please provide a password'

    if(!validatePassword(password))
        return 'incorrect password'

    return ''
}

const checkAuth =  (req, res, next) => {
    if(req.isAuthenticated())
        return next()

    next(new HTTPError(401))
}

const getSelf = ah(async (req, res, next) => {
    const {user} = req

    if(req.user)
        return res.json(await user.selectToSend({
            withEmail: true
        }))

    res.json(null)
})

module.exports = {
    getOthers,
    login,
    logout,
    register,
    checkAuth,
    getSelf
}
