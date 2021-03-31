const express = require('express'); // express biblioteca para criar servidor
const routes = express.Router() // Router (parte do express que cria as rotas)

const view = __dirname + "/views/" // usando template engine

const profile = {
    name: "Rodrigo",
    avatar: "https://github.com/RodrigoGrz.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

routes.get('/', (req, res) => res.render(view + "index"))
routes.get('/job', (req, res) => res.render(view + "job"))
routes.post('/job', (req, res) => {
    console.log(req)
})
routes.get('/job/edit', (req, res) => res.render(view + "job-edit"))
routes.get('/profile', (req, res) => res.render(view + "profile", { profile }))


module.exports = routes;