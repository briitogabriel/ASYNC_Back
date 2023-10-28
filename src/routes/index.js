const { routesFromDietas } = require('./dietas.routes')
const { routesFromLogs } = require('./logs.routes')
const { routesFromPaciente } = require('./pacientes.routes')
const { routesFromUsuario } = require('./usuarios.routes')
const { Router } = require('express')

const routes = new Router()

routes.use('/api', [
    routesFromDietas(),
    routesFromUsuario(),
    routesFromPaciente(),
    routesFromLogs(),

])

module.exports = routes