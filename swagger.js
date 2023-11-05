require("dotenv").config();
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/modules/*.js']

const docDefinition = {
  info: {
    version: "1.0.0",
    title: "ASYNC Lab API",
    description: "Documentação da <b>SQUAD4 - ASYNC</b>, gerada automaticamente com <b>swagger-autogen</b>"
  },
  host: `localhost:${process.env.APP_PORT}`,
  basePath: "/api/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: "Usuários", description: "Endpoints de requisições de Usuários" },
    { name: "Consultas", description: "Endpoints de requisições de Consultas" },
    { name: "Dietas", description: "Endpoints de requisições de Dietas" },
    { name: "Estatísticas", description: "Endpoints de requisições de Estatísticas" },
    { name: "Exames", description: "Endpoints de requisições de Exames" },
    { name: "Exercícios", description: "Endpoints de requisições de Exercícios" },
    { name: "Logs", description: "Endpoints de requisições de Logs" },
    { name: "Medicamentos", description: "Endpoints de requisições de Medicamentos" },
    { name: "Pacientes", description: "Endpoints de requisições de Pacientes" },
    { name: "Prontuários", description: "Endpoints de requisições de Prontuários" },
  ],
  definitions: {
    
  }
}

swaggerAutogen(outputFile, endpointsFiles, docDefinition)