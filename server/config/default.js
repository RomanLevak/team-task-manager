module.exports = {
    secret: process.env.SECRET || 'some sekret value',
    server: {
        host: 'http://localhost',
        port: process.env.PORT || 3000,
    },
    mongodb: {
        uri: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/team-task-manager'
    },
    crypto: {
        hash: {
            length: 128,
            iterations: 10
        }
    },
    passwordRegExp: /^.{4,200}$/
}
