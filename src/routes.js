const express = require('express'); // express biblioteca para criar servidor
const routes = express.Router() // Router (parte do express que cria as rotas)

const views = __dirname + "/views/" // usando template engine

const Profile = {
    data: {
        name: "Rodrigo",
        avatar: "https://github.com/RodrigoGrz.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            res.render(views + "profile", { profile: Profile.data })
        },

        update(req, res) {
            // req.body para pegar os dados
            // definir quantas semana tem em um ano
            // remover as semanas de ferias do ano
            // quantas horas por semana estou trabalhando
            // total de horas trabalhadas no mes
        }
    }
}

const Job = {
    data: [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2, 
        "total-hours": 1,
        createdAt: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3, 
        "total-hours": 47,
        createdAt: Date.now()
    }
    ],
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                //  ajustes no job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
            
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data["value-hour"] * job["total-hours"]
                    }
                })
            
                
            return res.render(views + "index", { jobs: updatedJobs })
        },
        
        create(req, res) {
            return res.render(views + "job")
        },

        save(req, res) {
        // { name: 'rthgf', 'daily-hours': '43', 'total-hours': '67' }
        const lastId = Job.data[Job.data.length - 1] ?.id || 1;

        Job.data.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"], 
            "total-hours": req.body["total-hours"],
            createdAt: Date.now() // atribuindo data de hoje
        })
        return res.redirect('/')
        }
    },
    services: {
        remainingDays(job) {
            // calculo de tempo restante
            const remainingDays = (job["total-hours"]  / job["daily-hours"]).toFixed()
        
            const createdDate = new Date(job.createdAt)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDate = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDate - Date.now()
            // transformar mili em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs).toFixed()
        
            // restam x dias
            return dayDiff
        }
    }
}


routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes;