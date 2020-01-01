const mongoose = require('mongoose')
const config = require('config')

const uri =  config.get('mongodb.uri')

mongoose.connect(
    uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('connected to DataBase'))
    .catch(err => console.log(err))

module.exports = mongoose
