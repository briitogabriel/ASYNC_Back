const { Router } = require('express')

const { routesFromDietas } = require('./modules/dietas.routes')
const { routesFromExercicios } = require('./modules/exercicios.routes')
const { routesFromLogs } = require('./modules/logs.routes')
const { routesFromPaciente } = require('./modules/pacientes.routes')
const { routesFromProntuario } = require('./modules/prontuarios.routes')
const { routesFromEstatisticas } = require('./modules/estatisticas.routes')
const { routesFromUsuario } = require('./modules/usuarios.routes')
const { routesFromExames } = require('./modules/exames.routes')
const { routesFromConsultas } = require('./modules/consultas.routes')
const { routesFromMedicamentos } = require('./modules/medicamentos.routes')

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

const swaggerFile = require('../../swagger_output.json')
const swaggerUi = require('swagger-ui-express');
routes.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = routes