const express = require('express'); // express biblioteca para criar servidor
const routes = express.Router() // Router (parte do express que cria as rotas)
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

routes.get('/', JobController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)


module.exports = routes;