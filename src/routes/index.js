const { routesFromDietas } = require('./dietas.routes')
const { routesFromPaciente } = require('./pacientes.routes')
const { routesFromProntuario } = require('./prontuarios.routes')
const { routesFromUsuario } = require('./usuarios.routes')
const { Router } = require('express')

const routes = new Router()

routes.use('/api', [
    routesFromDietas(),
    routesFromUsuario(),
    routesFromPaciente(),
    routesFromProntuario(),
])

module.exports = routes