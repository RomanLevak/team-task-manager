const app = require('./app.js')
const config = require('config')

const port = config.get('server.port')
require('./fixtures')

app.listen(port, () =>
    console.log(`server is working on port: ${port}`)
)
