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
  host: `${process.env.APP_PROD_HOST}`,
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
    "usuarioLogin200": {
      "message": "Usuário autenticado com sucesso.",
      "data": { "token": "JWT Token", "user": "John Doe" },
      "success": true
    },
    "usuarioLogin400": {
      "message": "Os dados são obrigatórios.",
      "data": null,
      "success": false
    },
    "usuarioLogin401": {
      "message": "Usuário e/ou senha inválidos."
    },
    "usuarioLogin404": {
      "message": "Não foi possível realizar a autenticação. Usuário não cadastrado."
    },
    "usuarioLogin500": {
      "message": "Não conseguimos processar sua solicitação."
    },
    "usuarioResetSenha400": {
      "message": "Dados ausentes ou inválidos para redefinir a senha."
    },
    "usuarioResetSenha404": {
      "message": "Usuário não encontrado."
    },
    "usuarioResetSenha500": {
      "message": "Erro ao atualizar senha do usuário."
    },
    "usuarioCreate201": {
      "message": "Usuário criado com sucesso!"
    },
    "usuarioCreate400": {
      "message": "Requisição inválida, dados de usuário ausentes ou inválidos."
    },
    "usuarioCreate409": {
      "message": "Usuário já cadastrado com o mesmo CPF ou email."
    },
    "usuarioCreate500": {
      "message": "Erro interno do servidor."
    },
    "usuarioUpdate200": {
      "message": "Usuário atualizado com sucesso"
    },
    "usuarioUpdate400": {
      "message": "Requisição inválida, dados de usuário ausentes ou inválidos."
    },
    "usuarioUpdate404": {
      "message": "Usuário não encontrado."
    },
    "usuarioUpdate500": {
      "message": "Erro interno do servidor."
    },
    "usuarioFindAll200": {
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
    "usuarioFindAll500": {
      "message": "Erro ao listar todos os usuários"
    },
    "usuarioRemove400": {
      "message": "Requisição inválida, dados de remoção ausentes ou inválidos."
    },
    "usuarioRemove401": {
      "message": "Operação não autorizada"
    },
    "usuarioRemove404": {
      "message": "Usuário não encontrado"
    },
    "usuarioRemove500": {
      "message": "Erro ao remover usuário"
    },

    "consultaCreate201": {
      "message": "Consulta criada com sucesso!"
    },
    "consultaCreate400": {
      "message": "Erro na criação da Consulta",
      "cause": "Detalhes do erro"
    },
    "consultaCreate500": {
      "message": "Ocorreu um erro desconhecido",
      "cause": "Detalhes do erro"
    },
    "consultaFindOne200": {
      "consultaId": 1,
      "con_motivo": "Motivo da consulta",
      "con_data": "2023-11-05T00:00:00.000Z",
      "con_hora": "2023-11-05T12:00:00.000Z",
      "con_descricao": "Descrição da consulta",
      "con_medicacao": "Medicação prescrita",
      "con_dosagem_precaucoes": "Dosagem e precauções",
      "con_status": true,
      "pac_id": 1,
      "created_at": "2023-11-05T00:00:00.000Z",
      "updated_at": "2023-11-05T00:00:00.000Z"
    },
    "consultaFindOne404": {
      "message": "Consulta não encontrada."
    },
    "consultaFindOne500": {
      "message": "Não foi possível processar a sua solicitação",
      "cause": "Detalhes do erro"
    },
    "consultaFindAllAdmin200": {
      "consultas": [
        {
          "consultaId": 1,
          "con_motivo": "Motivo da consulta",
          "con_data": "2023-11-05T00:00:00.000Z",
          "con_hora": "2023-11-05T12:00:00.000Z",
          "con_descricao": "Descrição da consulta",
          "con_medicacao": "Medicação prescrita",
          "con_dosagem_precaucoes": "Dosagem e precauções",
          "con_status": true,
          "pac_id": 1,
          "created_at": "2023-11-05T00:00:00.000Z",
          "updated_at": "2023-11-05T00:00:00.000Z"
        },
        {
          "consultaId": 2,
          "con_motivo": "Motivo da consulta",
          "con_data": "2023-11-05T00:00:00.000Z",
          "con_hora": "2023-11-05T12:00:00.000Z",
          "con_descricao": "Descrição da consulta",
          "con_medicacao": "Medicação prescrita",
          "con_dosagem_precaucoes": "Dosagem e precauções",
          "con_status": true,
          "pac_id": 2,
          "created_at": "2023-11-05T00:00:00.000Z",
          "updated_at": "2023-11-05T00:00:00.000Z"
        }
      ]
    },
    "consultaFindAllAdmin500": {
      "message": "Erro ao listar consultas.",
      "cause": "Detalhes do erro"
    },
    "consultaFindAllByPatient200": {
      "consultas": [
        {
          "consultaId": 1,
          "con_motivo": "Motivo da consulta",
          "con_data": "2023-11-05T00:00:00.000Z",
          "con_hora": "2023-11-05T12:00:00.000Z",
          "con_descricao": "Descrição da consulta",
          "con_medicacao": "Medicação prescrita",
          "con_dosagem_precaucoes": "Dosagem e precauções",
          "con_status": true,
          "pac_id": 1,
          "created_at": "2023-11-05T00:00:00.000Z",
          "updated_at": "2023-11-05T00:00:00.000Z"
        },
        {
          "consultaId": 2,
          "con_motivo": "Motivo da consulta",
          "con_data": "2023-11-05T00:00:00.000Z",
          "con_hora": "2023-11-05T12:00:00.000Z",
          "con_descricao": "Descrição da consulta",
          "con_medicacao": "Medicação prescrita",
          "con_dosagem_precaucoes": "Dosagem e precauções",
          "con_status": true,
          "pac_id": 1,
          "created_at": "2023-11-05T00:00:00.000Z",
          "updated_at": "2023-11-05T00:00:00.000Z"
        }
      ]
    },
    "consultaFindAllByPatient500": {
      "message": "Erro ao listar consultas",
      "cause": "Detalhes do erro"
    },
    "consultaUpdate200": {
      "message": "Consulta atualizada com sucesso!"
    },
    "consultaUpdate400": {
      "message": "Erro na atualização de Consulta",
      "cause": "Detalhes do erro"
    },
    "consultaUpdate500": {
      "message": "Ocorreu um erro desconhecido",
      "cause": "Detalhes do erro"
    },
    "consultaRemove202": {
      "message": "Consulta removida com sucesso."
    },
    "consultaRemove400": {
      "message": "Erro ao remover consulta",
      "cause": "Detalhes do erro"
    },
    "consultaRemove500": {
      "message": "Ocorreu um erro desconhecido",
      "cause": "Detalhes do erro"
    },

    "dietaCreate201": {
      "message": "Dieta criada com sucesso",
      "die_nome": "Dieta de rotina",
      "die_data": "2023-11-05",
      "die_hora": "09:00:00",
      "die_tipo": "Dieta balanceada",
      "die_descricao": "Dieta para controle de peso",
      "pac_id": 1
    },
    "dietaCreate400": {
      "message": "Requisição inválida, dados de dieta ausentes ou inválidos",
      "cause": "Detalhes do erro"
    },
    "dietaCreate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "dietaUpdate201": {
      "message": "Dieta atualizada com sucesso"
    },
    "dietaUpdate400": {
      "message": "Requisição inválida, dados de atualização ausentes ou inválidos",
      "cause": "Detalhes do erro"
    },
    "dietaUpdate404": {
      "message": "Dieta não encontrada"
    },
    "dietaUpdate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "dietaRemove202": {
      "message": "Dieta removida com sucesso"
    },
    "dietaRemove400": {
      "message": "Requisição inválida, dados de remoção ausentes ou inválidos",
      "cause": "Detalhes do erro"
    },
    "dietaRemove500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "dietaFindAllAdmin200": {
      "message": "Lista de todas as dietas",
      "dietas": [
        {
          "die_nome": "Dieta de rotina",
          "die_data": "2023-11-05",
          "die_hora": "09:00:00",
          "die_tipo": "Dieta balanceada",
          "die_descricao": "Dieta para controle de peso",
          "pac_id": 1
        },
        {
          "die_nome": "Dieta de rotina",
          "die_data": "2023-11-05",
          "die_hora": "09:00:00",
          "die_tipo": "Dieta balanceada",
          "die_descricao": "Dieta para controle de peso",
          "pac_id": 2
        }
      ]
    },
    "dietaFindAllAdmin500": {
      "message": "Erro ao listar dietas",
      "cause": "Detalhes do erro"
    },
    "dietaFindAllByPatient200": {
      "message": "Dietas encontradas (Nome do Paciente)",
      "data": [
        {
          "die_nome": "Dieta de rotina",
          "die_data": "2023-11-05",
          "die_hora": "09:00:00",
          "die_tipo": "Dieta balanceada",
          "die_descricao": "Dieta para controle de peso",
          "pac_id": 1
        },
        {
          "die_nome": "Dieta de rotina",
          "die_data": "2023-11-05",
          "die_hora": "09:00:00",
          "die_tipo": "Dieta balanceada",
          "die_descricao": "Dieta para controle de peso",
          "pac_id": 2
        }
      ]
    },
    "dietaFindAllByPatient500": {
      "message": "Erro ao listar dietas",
      "cause": "Detalhes do erro"
    },

    "examCreate201": {
      "message": "Exame criado com sucesso",
      "exa_nome": "Nome do Exame",
      "exa_tipo": "Tipo do Exame",
      "exa_laboratorio": "Nome do Laboratório",
      "exa_url_documento": "URL do Documento",
      "exa_resultados": "Resultados do Exame",
      "exa_data": "2023-11-05",
      "exa_hora": "09:00:00",
      "pac_id": 1
    },
    "examCreate400": {
      "message": "Requisição inválida, dados de exame ausentes ou inválidos",
      "cause": "Detalhes do erro"
    },
    "examCreate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "examFindOne200": {
      "exa_nome": "Nome do Exame",
      "exa_tipo": "Tipo do Exame",
      "exa_laboratorio": "Nome do Laboratório",
      "exa_url_documento": "URL do Documento",
      "exa_resultados": "Resultados do Exame",
      "exa_data": "2023-11-05",
      "exa_hora": "09:00:00",
      "pac_id": 1
    },
    "examFindOne404": {
      "message": "Exame não encontrado"
    },
    "examFindOne500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "examUpdate201": {
      "message": "Exame atualizado com sucesso"
    },
    "examUpdate400": {
      "message": "Requisição inválida, dados de exame ausentes ou inválidos",
      "cause": "Detalhes do erro"
    },
    "examUpdate404": {
      "message": "Exame não encontrado"
    },
    "examUpdate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "examRemove202": {
      "message": "Exame removido com sucesso"
    },
    "examRemove400": {
      "message": "Requisição inválida, dados de remoção ausentes ou inválidos",
      "cause": "Detalhes do erro"
    },
    "examRemove500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "examFindExamsByUser200": {
      "message": "Lista de exames encontrados",
      "exames": [
        {
          "exa_nome": "Nome do Exame",
          "exa_tipo": "Tipo do Exame",
          "exa_laboratorio": "Nome do Laboratório",
          "exa_url_documento": "URL do Documento",
          "exa_resultados": "Resultados do Exame",
          "exa_data": "2023-11-05",
          "exa_hora": "09:00:00",
          "pac_id": 1
        },
        {
          "exa_nome": "Nome do Exame",
          "exa_tipo": "Tipo do Exame",
          "exa_laboratorio": "Nome do Laboratório",
          "exa_url_documento": "URL do Documento",
          "exa_resultados": "Resultados do Exame",
          "exa_data": "2023-11-05",
          "exa_hora": "09:00:00",
          "pac_id": 2
        }
      ]
    },
    "examFindExamsByUser500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "examFindAllAdmin200": {
      "message": "Lista de todos os exames cadastrados (Admin)",
      "exames": [
        {
          "exa_nome": "Nome do Exame",
          "exa_tipo": "Tipo do Exame",
          "exa_laboratorio": "Nome do Laboratório",
          "exa_url_documento": "URL do Documento",
          "exa_resultados": "Resultados do Exame",
          "exa_data": "2023-11-05",
          "exa_hora": "09:00:00",
          "pac_id": 1
        },
        {
          "exa_nome": "Nome do Exame",
          "exa_tipo": "Tipo do Exame",
          "exa_laboratorio": "Nome do Laboratório",
          "exa_url_documento": "URL do Documento",
          "exa_resultados": "Resultados do Exame",
          "exa_data": "2023-11-05",
          "exa_hora": "09:00:00",
          "pac_id": 2
        }
      ]
    },
    "examFindAllAdmin500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "examFindAllByPatient200": {
      "message": "Lista de exames do paciente",
      "exames": [
        {
          "exa_nome": "Nome do Exame",
          "exa_tipo": "Tipo do Exame",
          "exa_laboratorio": "Nome do Laboratório",
          "exa_url_documento": "URL do Documento",
          "exa_resultados": "Resultados do Exame",
          "exa_data": "2023-11-05",
          "exa_hora": "09:00:00",
          "pac_id": 1
        },
        {
          "exa_nome": "Nome do Exame",
          "exa_tipo": "Tipo do Exame",
          "exa_laboratorio": "Nome do Laboratório",
          "exa_url_documento": "URL do Documento",
          "exa_resultados": "Resultados do Exame",
          "exa_data": "2023-11-05",
          "exa_hora": "09:00:00",
          "pac_id": 2
        }
      ]
    },
    "examFindAllByPatient500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },

    "exerciseCreate201": {
      "message": "Exercício criado com sucesso",
      "exe_nome": "Nome do Exercício",
      "exe_data": "Data do Exercício",
      "exe_hora": "Hora do Exercício",
      "exe_tipo": "Tipo do Exercício",
      "exe_descricao": "Descrição do Exercício",
      "exe_qtd": 1,
      "pac_id": 1
    },
    "exerciseCreate400": {
      "message": "Requisição inválida, dados de exercício ausentes ou inválidos",
      "cause": "Detalhes do erro"
    },
    "exerciseCreate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "exerciseFindAllByPatient200": {
      "message": "Exercicios encontrados (nome do paciente)",
      "data": [
        {
          "exe_nome": "Nome do Exercício",
          "exe_data": "Data do Exercício",
          "exe_hora": "Hora do Exercício",
          "exe_tipo": "Tipo do Exercício",
          "exe_descricao": "Descrição do Exercício",
          "exe_qtd": 1,
          "pac_id": 1
        },
        {
          "exe_nome": "Nome do Exercício",
          "exe_data": "Data do Exercício",
          "exe_hora": "Hora do Exercício",
          "exe_tipo": "Tipo do Exercício",
          "exe_descricao": "Descrição do Exercício",
          "exe_qtd": 2,
          "pac_id": 2
        }
      ]
    },
    "exerciseFindAllByPatient500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "exerciseUpdate201": {
      "message": "Exercício atualizado com sucesso"
    },
    "exerciseUpdate400": {
      "message": "Requisição inválida, dados de exercício ausentes ou inválidos",
      "cause": "Detalhes do erro"
    },
    "exerciseUpdate404": {
      "message": "Exercício não encontrado"
    },
    "exerciseUpdate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "exerciseRemove202": {
      "message": "Exercício removido com sucesso"
    },
    "exerciseRemove400": {
      "message": "Requisição inválida, dados de remoção ausentes ou inválidos",
      "cause": "Detalhes do erro"
    },
    "exerciseRemove500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "exerciseFindAllAdmin200": {
      "message": "Lista de todos os exercícios cadastrados (Admin)",
      "exercicios": [
        {
          "exe_nome": "Nome do Exercício",
          "exe_data": "Data do Exercício",
          "exe_hora": "Hora do Exercício",
          "exe_tipo": "Tipo do Exercício",
          "exe_descricao": "Descrição do Exercício",
          "exe_qtd": 1,
          "pac_id": 1
        },
        {
          "exe_nome": "Nome do Exercício",
          "exe_data": "Data do Exercício",
          "exe_hora": "Hora do Exercício",
          "exe_tipo": "Tipo do Exercício",
          "exe_descricao": "Descrição do Exercício",
          "exe_qtd": 2,
          "pac_id": 2
        }
      ]
    },
    "exerciseFindAllAdmin500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },

    "logsList200": {
      "message": "Lista de registros de logs",
      "logs": [
        {
          "log_id": 1,
          "log_date": "Data do Log",
          "log_message": "Mensagem do Log",
          "log_type": "Tipo do Log",
          "user_id": 1
        },
        {
          "log_id": 2,
          "log_date": "Data do Log",
          "log_message": "Mensagem do Log",
          "log_type": "Tipo do Log",
          "user_id": 2
        }
      ]
    },
    "logsList500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },

    "medicamentoCreate201": {
      "message": "Medicamento criado com sucesso",
      "medicamento": {
        "med_id": 1,
        "med_nome": "Medicamento X",
        "med_data": "2023-11-10",
        "med_hora": "08:00",
        "med_tipo": "Comprimido",
        "med_descricao": "Descrição do medicamento",
        "med_qtd": 1,
        "med_unidade": "unidade",
        "med_observacoes": "Observações do medicamento",
        "pac_id": 1,
        "created_at": "2023-11-05T12:34:56.789Z",
        "updated_at": "2023-11-05T12:34:56.789Z"
      }
    },
    "medicamentoCreate400": {
      "message": "Requisição inválida, dados de medicamento ausentes ou inválidos",
      "cause": "Detalhes do erro de validação"
    },
    "medicamentoCreate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "medicamentoFindOne200": {
      "message": "Medicamento encontrado",
      "medicamento": {
        "med_id": 1,
        "med_nome": "Medicamento X",
        "med_data": "2023-11-10",
        "med_hora": "08:00",
        "med_tipo": "Comprimido",
        "med_descricao": "Descrição do medicamento",
        "med_qtd": 1,
        "med_unidade": "unidade",
        "med_observacoes": "Observações do medicamento",
        "pac_id": 1,
        "created_at": "2023-11-05T12:34:56.789Z",
        "updated_at": "2023-11-05T12:34:56.789Z"
      }
    },
    "medicamentoFindOne404": {
      "message": "Medicamento não encontrado"
    },
    "medicamentoFindOne500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "medicamentoUpdate200": {
      "message": "Medicamento atualizado com sucesso"
    },
    "medicamentoUpdate400": {
      "message": "Requisição inválida, dados de medicamento ausentes ou inválidos",
      "cause": "Detalhes do erro de validação"
    },
    "medicamentoUpdate404": {
      "message": "Medicamento não encontrado"
    },
    "medicamentoUpdate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "medicamentoRemove400": {
      "message": "Requisição inválida, dados de remoção ausentes ou inválidos",
      "cause": "Detalhes do erro de validação"
    },
    "medicamentoRemove500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "medicamentoFindMedicamentosByUser200": {
      "message": "Medicamentos encontrados",
      "medicamentos": [
        {
          "med_id": 1,
          "med_nome": "Medicamento X",
          "med_data": "2023-11-10",
          "med_hora": "08:00",
          "med_tipo": "Comprimido",
          "med_descricao": "Descrição do medicamento",
          "med_qtd": 1,
          "med_unidade": "unidade",
          "med_observacoes": "Observações do medicamento",
          "pac_id": 1,
          "created_at": "2023-11-05T12:34:56.789Z",
          "updated_at": "2023-11-05T12:34:56.789Z"
        },
        {
          "med_id": 2,
          "med_nome": "Medicamento Y",
          "med_data": "2023-11-11",
          "med_hora": "12:00",
          "med_tipo": "Gotas",
          "med_descricao": "Nova descrição do medicamento",
          "med_qtd": 2,
          "med_unidade": "ml",
          "med_observacoes": "Novas observações do medicamento",
          "pac_id": 2,
          "created_at": "2023-11-06T12:34:56.789Z",
          "updated_at": "2023-11-06T12:34:56.789Z"
        }
      ]
    },
    "medicamentoFindMedicamentosByUser500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "medicamentoFindAllByPatient200": {
      "message": "Lista de medicamentos do paciente",
      "medicamentos": [
        {
          "med_id": 1,
          "med_nome": "Medicamento X",
          "med_data": "2023-11-10",
          "med_hora": "08:00",
          "med_tipo": "Comprimido",
          "med_descricao": "Descrição do medicamento",
          "med_qtd": 1,
          "med_unidade": "unidade",
          "med_observacoes": "Observações do medicamento",
          "pac_id": 1,
          "created_at": "2023-11-05T12:34:56.789Z",
          "updated_at": "2023-11-05T12:34:56.789Z"
        },
        {
          "med_id": 2,
          "med_nome": "Medicamento Y",
          "med_data": "2023-11-11",
          "med_hora": "12:00",
          "med_tipo": "Gotas",
          "med_descricao": "Nova descrição do medicamento",
          "med_qtd": 2,
          "med_unidade": "ml",
          "med_observacoes": "Novas observações do medicamento",
          "pac_id": 2,
          "created_at": "2023-11-06T12:34:56.789Z",
          "updated_at": "2023-11-06T12:34:56.789Z"
        }
      ]
    },
    "medicamentoFindAllByPatient500": {
      "message": "Erro ao listar medicamentos",
      "cause": "Detalhes do erro"
    },

    "pacienteCreate201": {
      "message": "Paciente criado com sucesso",
      "paciente": {
        "pac_id": 1,
        "pac_nome": "João da Silva",
        "pac_genero": "Masculino",
        "pac_nascimento": "1990-01-01",
        "pac_cpf": "12345678901",
        "pac_rg": "1234567",
        "pac_estado_civil": "Casado",
        "pac_telefone": "1234567890",
        "pac_email": "joao.silva@example.com",
        "pac_naturalidade": "São Paulo",
        "pac_contato_emergencia": "Maria da Silva",
        "pac_alergias": "Nenhuma",
        "pac_cuidados_especiais": "Nenhum",
        "pac_convenio": "Unimed",
        "pac_numero_convenio": "12345",
        "pac_validade_convenio": "2023-12-31",
        "end_cep": "12345-678",
        "end_cidade": "São Paulo",
        "end_estado": "SP",
        "end_logradouro": "Avenida Principal",
        "comp_numero": "123",
        "comp_complemento": "Apartamento 4B",
        "comp_bairro": "Centro",
        "comp_ponto_referencia": "Próximo ao mercado",
        "usu_id": 1,
        "created_at": "2023-11-05T12:34:56.789Z",
        "updated_at": "2023-11-05T12:34:56.789Z"
      }
    },
    "pacienteCreate400": {
      "message": "Requisição inválida, dados de paciente ausentes ou inválidos",
      "cause": "Detalhes do erro de validação"
    },
    "pacienteCreate409": {
      "message": "Paciente já cadastrado"
    },
    "pacienteCreate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "pacienteUpdate200": {
      "message": "Paciente atualizado com sucesso"
    },
    "pacienteUpdate400": {
      "message": "Requisição inválida, dados de paciente ausentes ou inválidos",
      "cause": "Detalhes do erro de validação"
    },
    "pacienteUpdate404": {
      "message": "Paciente não encontrado"
    },
    "pacienteUpdate500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "pacienteFindAll200": {
      "message": "Lista de pacientes",
      "pacientes": [
        {
          "pac_id": 1,
          "pac_nome": "João da Silva",
          "pac_genero": "Masculino",
          "pac_nascimento": "1990-01-01",
          "pac_cpf": "12345678901",
          "pac_rg": "1234567",
          "pac_estado_civil": "Casado",
          "pac_telefone": "1234567890",
          "pac_email": "joao.silva@example.com",
          "pac_naturalidade": "São Paulo",
          "pac_contato_emergencia": "Maria da Silva",
          "pac_alergias": "Nenhuma",
          "pac_cuidados_especiais": "Nenhum",
          "pac_convenio": "Unimed",
          "pac_numero_convenio": "12345",
          "pac_validade_convenio": "2023-12-31",
          "end_cep": "12345-678",
          "end_cidade": "São Paulo",
          "end_estado": "SP",
          "end_logradouro": "Avenida Principal",
          "comp_numero": "123",
          "comp_complemento": "Apartamento 4B",
          "comp_bairro": "Centro",
          "comp_ponto_referencia": "Próximo ao mercado",
          "usu_id": 1,
          "created_at": "2023-11-05T12:34:56.789Z",
          "updated_at": "2023-11-05T12:34:56.789Z"
        }
      ]
    },
    "pacienteFindAll500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "pacienteFindOne200": {
      "message": "Paciente encontrado",
      "paciente": {
        "pac_id": 1,
        "pac_nome": "João da Silva",
        "pac_genero": "Masculino",
        "pac_nascimento": "1990-01-01",
        "pac_cpf": "12345678901",
        "pac_rg": "1234567",
        "pac_estado_civil": "Casado",
        "pac_telefone": "1234567890",
        "pac_email": "joao.silva@example.com",
        "pac_naturalidade": "São Paulo",
        "pac_contato_emergencia": "Maria da Silva",
        "pac_alergias": "Nenhuma",
        "pac_cuidados_especiais": "Nenhum",
        "pac_convenio": "Unimed",
        "pac_numero_convenio": "12345",
        "pac_validade_convenio": "2023-12-31",
        "end_cep": "12345-678",
        "end_cidade": "São Paulo",
        "end_estado": "SP",
        "end_logradouro": "Avenida Principal",
        "comp_numero": "123",
        "comp_complemento": "Apartamento 4B",
        "comp_bairro": "Centro",
        "comp_ponto_referencia": "Próximo ao mercado",
        "usu_id": 1,
        "created_at": "2023-11-05T12:34:56.789Z",
        "updated_at": "2023-11-05T12:34:56.789Z"
      }
    },
    "pacienteFindOne404": {
      "message": "Paciente não encontrado"
    },
    "pacienteFindOne500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
    "pacienteRemove202": {
      "message": "Paciente removido com sucesso"
    },
    "pacienteRemove404": {
      "message": "Paciente não encontrado"
    },
    "pacienteRemove500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },

    "pacientesFindAll200": {
      "message": "Lista de pacientes",
      "pacientes": [
        {
          "pac_id": 1,
          "pac_nome": "João da Silva",
          "pac_genero": "Masculino",
          "pac_nascimento": "1990-01-01",
          "pac_cpf": "12345678901",
          "pac_rg": "1234567",
          "pac_estado_civil": "Casado",
          "pac_telefone": "1234567890",
          "pac_email": "joao.silva@example.com",
          "pac_naturalidade": "São Paulo",
          "pac_contato_emergencia": "Maria da Silva",
          "pac_alergias": "Nenhuma",
          "pac_cuidados_especiais": "Nenhum",
          "pac_convenio": "Unimed",
          "pac_numero_convenio": "12345",
          "pac_validade_convenio": "2023-12-31",
          "end_cep": "12345-678",
          "end_cidade": "São Paulo",
          "end_estado": "SP",
          "end_logradouro": "Avenida Principal",
          "comp_numero": "123",
          "comp_complemento": "Apartamento 4B",
          "comp_bairro": "Centro",
          "comp_ponto_referencia": "Próximo ao mercado",
          "usu_id": 1,
          "created_at": "2023-11-05T12:34:56.789Z",
          "updated_at": "2023-11-05T12:34:56.789Z"
        }
      ]
    },
    "pacientesFindAll400": {
      "message": "Requisição inválida, informe nome ou pacienteId, não ambos"
    },
    "pacientesFindAll500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },

    "estatisticasFindAll200": {
      "totalPacientes": 100,
      "totalConsultas": 500,
      "totalExames": 200,
    },
    "estatisticasFindAll500": {
      "message": "Erro interno do servidor",
      "cause": "Detalhes do erro"
    },
  },
}

swaggerAutogen(outputFile, endpointsFiles, docDefinition)