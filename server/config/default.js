module.exports = {
    secret: process.env.SECRET || 'some sekret value',
    server: {
        host: 'http://localhost',
        port: process.env.port || 3000,
    },
    mongodb: {
        uri: 'mongodb://localhost:27017/team-task-manager'
    },
    crypto: {
        hash: {
            length: 128,
            iterations: 10
        }
    },
    passwordRegExp: /^.{4,200}$/
}
