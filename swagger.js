const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/modules/*.js']

const docDefinition = {
  info: {
      version: "1.0.0",
      title: "ASYNC Lab API",
      description: "Documentação da <b>SQUAD4 - ASYNC</b>, gerada automaticamente com <b>swagger-autogen</b>"
  },
  host: "localhost:3333",
  basePath: "/api/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  // tags: [
  //     {
  //         "name": "User",
  //         "description": "Endpoints"
  //     }
  // ],
  // securityDefinitions: {
  //     api_key: {
  //         type: "apiKey",
  //         name: "api_key",
  //         in: "header"
  //     },
  //     petstore_auth: {
  //         type: "oauth2",
  //         authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
  //         flow: "implicit",
  //         scopes: {
  //             read_pets: "read your pets",
  //             write_pets: "modify pets in your account"
  //         }
  //     }
  // },
  // definitions: {
  //     Parents: {
  //         father: "Simon Doe",
  //         mother: "Marie Doe"
  //     },
  //     User: {
  //         name: "Jhon Doe",
  //         age: 29,
  //         parents: {
  //             $ref: '#/definitions/Parents'
  //         },
  //         diplomas: [
  //             {
  //                 school: "XYZ University",
  //                 year: 2020,
  //                 completed: true,
  //                 internship: {
  //                     hours: 290,
  //                     location: "XYZ Company"
  //                 }
  //             }
  //         ]
  //     },
  //     AddUser: {
  //         $name: "Jhon Doe",
  //         $age: 29,
  //         about: ""
  //     }
  // }
}

swaggerAutogen(outputFile, endpointsFiles, docDefinition)