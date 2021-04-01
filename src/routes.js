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

const jobs = []

routes.get('/', (req, res) => res.render(view + "index"))
routes.get('/job', (req, res) => res.render(view + "job"))
routes.post('/job', (req, res) => {
    // { name: 'rthgf', 'daily-hours': '43', 'total-hours': '67' }

    const job = req.body
    job.createdAt = Date.now() // atribuindo nova data

    jobs.push()
    return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(view + "job-edit"))
routes.get('/profile', (req, res) => res.render(view + "profile", { profile }))


module.exports = routes;