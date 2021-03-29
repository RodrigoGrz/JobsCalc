const express = require("express")
const server = express()

server.get('/', (req, res) => {
    return res.send('oi')
})
server.listen(3000, () => console.log('rodando'))