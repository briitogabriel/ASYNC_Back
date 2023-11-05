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

// const swaggerJSDoc = require('swagger-jsdoc');
const swaggerFile = require('../../swagger_output.json')
const swaggerUi = require('swagger-ui-express');

// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Express API for JSONPlaceholder',
//     version: '1.0.0',
//     description:
//       'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
//     license: {
//       name: 'Licensed Under MIT',
//       url: 'https://spdx.org/licenses/MIT.html',
//     },
//     contact: {
//       name: 'JSONPlaceholder',
//       url: 'https://jsonplaceholder.typicode.com',
//     },
//   }

// };
// const options = {
//   swaggerDefinition,
//   apis: ['.*.js'],
// };
// const swaggerSpec = swaggerJSDoc(options);
routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = routes