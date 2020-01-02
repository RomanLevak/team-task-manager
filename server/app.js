const path = require('path')
const config = require('config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('./middlewares/session')
const passport = require('passport')
const errorHandler = require('./middlewares/error')
const router = require('./routes/index.js')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser(config.get('secret')))
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(
    path.join(__dirname, '..', 'client', 'public')
))

app.use(router)
app.use(errorHandler)

module.exports = app
