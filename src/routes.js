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

const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2, 
        "total-hours": 60,
        createdAt: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3, 
        "total-hours": 47,
        createdAt: Date.now()
    }
]

routes.get('/', (req, res) => {

    const updatedJobs = jobs.map((job) => {
        //  ajustes no job
        // calculo de tempo restante
        const remainingDays = (job["total=hours"]  / job["daily-hours"]).toFixed()

        const createdDate = new Date(job.createdAt)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        // const dueDate = createdDate.setDate

        return job
    })

    
    return res.render(view + "index", { jobs })
})

routes.get('/job', (req, res) => res.render(view + "job"))
routes.post('/job', (req, res) => {
    // { name: 'rthgf', 'daily-hours': '43', 'total-hours': '67' }
    const lastID = jobs[jobs.length - 1] ?.id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"], 
        "total-hours": req.body["total-hours"],
        createdAt: Date.now() // atribuindo data de hoje
    })
    return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(view + "job-edit"))
routes.get('/profile', (req, res) => res.render(view + "profile", { profile }))


module.exports = routes;