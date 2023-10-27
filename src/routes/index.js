const { routesFromDietas } = require('./dietas.routes')
const { routesFromExercicios } = require('./exercicios.routes')
const { routesFromPaciente } = require('./pacientes.routes')
const { routesFromUsuario } = require('./usuarios.routes')
const { Router } = require('express')

const routes = new Router()

routes.use('/api', [
    routesFromDietas(),
    routesFromUsuario(),
    routesFromPaciente(),
    routesFromExercicios(),
])

module.exports = routes