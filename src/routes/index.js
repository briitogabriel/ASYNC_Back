const { routesFromDietas } = require('./dietas.routes')

const { Router } = require('express')

const routes = new Router()

routes.use('/api', [
    routesFromDietas(),
])

module.exports = routes