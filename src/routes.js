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
            const data = req.body

            // definir quantas semana tem em um ano: 52
            const weeksPerYear = 52
            // remover as semanas de ferias do ano, para pegars qnts semanas tem em um mes
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

            // total de horas trabalhadas na semana 
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            // horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours + weeksPerMonth

            // qual será o valor da minha hora?
            const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
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
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                    }
                })
            
                
            return res.render(views + "index", { jobs: updatedJobs })
        },
        
        create(req, res) {
            return res.render(views + "job")
        },

        save(req, res) {
        // { name: 'rthgf', 'daily-hours': '43', 'total-hours': '67' }
        const lastId = Job.data[Job.data.length - 1] ?.id || 0;

        Job.data.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"], 
            "total-hours": req.body["total-hours"],
            createdAt: Date.now() // atribuindo data de hoje
        })
        return res.redirect('/')
        },

        show(req, res) {

            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job) {
                return res.send("Job not found")
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render(views + "job-edit", { job })
        },

        update(req, res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job) {
                return res.send("Job not found")
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            Job.data = Job.data.map(job => {

                if(Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }

                return job
            })

            res.redirect("/job/" + jobId)
        },

        delete(req, res) {
            const jobId = req.params.id
 
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

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
        },

        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}


routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes;