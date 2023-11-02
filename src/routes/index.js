const { routesFromDietas } = require('./dietas.routes')
const { routesFromExercicios } = require('./exercicios.routes')
const { routesFromLogs } = require('./logs.routes')
const { routesFromPaciente } = require('./pacientes.routes')
const { routesFromProntuario } = require('./prontuarios.routes')
const { routesFromEstatisticas } = require('./estatisticas.routes')
const { routesFromUsuario } = require('./usuarios.routes')
const { routesFromExames } = require('./exames.routes')
const { Router } = require('express')
const { routesFromConsultas } = require('./consultas.routes')
const { routesFromMedicamentos } = require('./medicamentos.routes')

const routes = new Router()

routes.use('/api', [
    routesFromDietas(),
    routesFromUsuario(),
    routesFromPaciente(),
    routesFromConsultas(),
    routesFromExercicios(),
    routesFromLogs(),
    routesFromProntuario(),
    routesFromExames(),
    routesFromEstatisticas(),
    routesFromMedicamentos()
])

module.exports = routes