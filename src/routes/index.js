const { routesFromDietas } = require('./dietas.routes')
const { routesFromPacientes } = require('./pacientes.routes')
const { routesFromUsuario } = require('./usuarios.routes')
const { Router } = require('express')

const routes = new Router()

routes.use('/api', [
    routesFromDietas(),
    routesFromUsuario(),
    routesFromPacientes(),
])

module.exports = routes