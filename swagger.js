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
    { name: "Autenticação", description: "Endpoints de Autenticação" },
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
    "userLogin200": {
      "message": "Usuário autenticado com sucesso.",
      "data": "jwtToken",
      "success": true
    },
    "userLogin400": {
      "message": "Os dados são obrigatórios.",
      "data": null,
      "success": false
    },
    "userLogin401": {
      "message": "Usuário e/ou senha inválidos."
    },
    "userLogin404": {
      "message": "Não foi possível realizar a autenticação. Usuário não cadastrado."
    },
    "userLogin500": {
      "message": "Não conseguimos processar sua solicitação."
    },
    "userResetSenha400": {
      "message": "Dados ausentes ou inválidos para redefinir a senha."
    },
    "userResetSenha404": {
      "message": "Usuário não encontrado."
    },
    "userResetSenha500": {
      "message": "Erro ao atualizar senha do usuário."
    },
    "userCreate201": {
      "message": "Usuário criado com sucesso!"
    },
    "userCreate400": {
      "message": "Requisição inválida, dados de usuário ausentes ou inválidos."
    },
    "userCreate409": {
      "message": "Usuário já cadastrado com o mesmo CPF ou email."
    },
    "userCreate500": {
      "message": "Erro interno do servidor."
    },
    "userUpdate200": {
      "message": "Usuário atualizado com sucesso"
    },
    "userUpdate400": {
      "message": "Requisição inválida, dados de usuário ausentes ou inválidos."
    },
    "userUpdate404": {
      "message": "Usuário não encontrado."
    },
    "userUpdate500": {
      "message": "Erro interno do servidor."
    },
    "userFindAll200": {
      "data": [
        {
          "usuarioId": 1,
          "nome": "John Doe",
          "genero": "male",
          "cpf": "123.456.789-10",
          "telefone": "(21) 9 8888 7777",
          "email": "john_doe@example.com",
          "status": true,
          "permissao": "admin",
          "createdAt": "2023-10-15T00:14:49.882Z",
          "updatedAt": "2023-10-15T00:14:49.882Z"
        },
        {
          "usuarioId": 2,
          "nome": "Jane Doe",
          "genero": "female",
          "cpf": "987.654.321-00",
          "telefone": "(21) 6 5555 4444",
          "email": "jane_doe@example.com",
          "status": true,
          "permissao": "admin",
          "createdAt": "2023-10-16T23:57:25.431Z",
          "updatedAt": "2023-10-16T23:57:25.431Z"
        }
      ]
    },
    "userFindAll500": {
      "message": "Erro ao listar todos os usuários"
    },
    "userRemove400": {
      "message": "Requisição inválida, dados de remoção ausentes ou inválidos."
    },
    "userRemove401": {
      "message": "Operação não autorizada"
    },
    "userRemove404": {
      "message": "Usuário não encontrado"
    },
    "userRemove500": {
      "message": "Erro ao remover usuário"
    }
  },
}

swaggerAutogen(outputFile, endpointsFiles, docDefinition)