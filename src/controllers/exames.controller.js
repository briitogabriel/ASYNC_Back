const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const exameSchema = require("../validations/exameValidation");
const Exames = require('../models/exames')(sequelize, Sequelize);
const Pacientes = require('../models/pacientes')(sequelize, Sequelize);

class ExameController {
    async create(req, res) {

        // #swagger.tags = ['Exames']
        // #swagger.summary = 'Criar um novo exame'
        // #swagger.description = 'Endpoint para criar um novo exame.'
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados do novo exame",
            type: "object",
            schema: {
            exa_nome: "Nome do Exame",
            exa_tipo: "Tipo do Exame",
            exa_laboratorio: "Nome do Laboratório",
            exa_url_documento: "URL do Documento",
            exa_resultados: "Resultados do Exame",
            exa_data: "Data do Exame",
            exa_hora: "Hora do Exame",
            pac_id: 1
            },
            required: true
        } */
        /* #swagger.responses[201] = { 
            description: 'Exame criado com sucesso',
            schema: { $ref: "#/definitions/examCreate201" }
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de exame ausentes ou inválidos',
            schema: { $ref: "#/definitions/examCreate400" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/examCreate500" }
        } */

        try {
            const {
                exa_nome,
                exa_tipo,
                exa_laboratorio,
                exa_url_documento,
                exa_resultados,
                pac_id,
                exa_data,
                exa_hora,
            } = req.body;

            await exameSchema.validate(
                {
                  exa_nome,
                  exa_tipo,
                  exa_laboratorio,
                  exa_url_documento,
                  exa_resultados,
                  exa_data,
                  exa_hora
                }
            );

            const exameCreated = await Exames.create({
                exa_nome,
                exa_data: exa_data == null ? new Date() : exa_data,
                exa_hora: exa_hora == null ? new Date() : exa_hora,
                exa_tipo,
                exa_laboratorio,
                exa_url_documento,
                exa_resultados,
                exa_status: true, 
                pac_id,
                created_at: new Date(),
                updated_at: new Date()
            });

            return res.status(201).send(exameCreated);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).send({
                    message: "Erro na criação do Exame",
                    cause: error.message
                });
            }

            return res.status(500).send({
                message: "Ocorreu um erro desconhecido",
                cause: error.message
            });
        }
    }

    async findOne(req, res) {

        // #swagger.tags = ['Exames']
        // #swagger.summary = 'Obter detalhes de um exame'
        // #swagger.description = 'Endpoint para obter detalhes de um exame pelo ID.'
        /* #swagger.parameters['exameId'] = {in: 'path', type: 'integer', description: 'ID do exame.'} */
        /* #swagger.responses[200] = { 
            description: 'Detalhes do exame',
            schema: { $ref: "#/definitions/examFindOne200" }
        } */
        /* #swagger.responses[404] = { 
            description: 'Exame não encontrado',
            schema: { $ref: "#/definitions/examFindOne404" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/examFindOne500" }
        } */

        try {
          const { exameId } = req.params;
          const exame = await Exames.findByPk(exameId);
    
          if (!exame) {
            return res.status(404).send({ message: "Exame não encontrado." });
          }
    
          return res.status(200).send(exame);
        } catch (error) {
          return res.status(500).send({
            message: "Não foi possível processar a sua solicitação",
            cause: error.message,
          });
        }
      }

    async update(req, res) {

        // #swagger.tags = ['Exames']
        // #swagger.summary = 'Atualizar um exame'
        // #swagger.description = 'Endpoint para atualizar um exame pelo ID.'
        /* #swagger.parameters['exameId'] = {in: 'path', type: 'integer', description: 'ID do exame a ser atualizado.'} */
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados de atualização do exame",
            type: "object",
            schema: {
            exa_nome: "Nome do Exame Atualizado",
            exa_tipo: "Tipo do Exame Atualizado",
            exa_laboratorio: "Nome do Laboratório Atualizado",
            exa_url_documento: "URL do Documento Atualizado",
            exa_resultados: "Resultados do Exame Atualizados",
            exa_data: "Data do Exame Atualizada",
            exa_hora: "Hora do Exame Atualizada"
            },
            required: true
        } */
        /* #swagger.responses[201] = { 
            description: 'Exame atualizado com sucesso',
            schema: { $ref: "#/definitions/examUpdate201" }
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de exame ausentes ou inválidos',
            schema: { $ref: "#/definitions/examUpdate400" }
        } */
        /* #swagger.responses[404] = { 
            description: 'Exame não encontrado',
            schema: { $ref: "#/definitions/examUpdate404" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/examUpdate500" }
        } */

        try {
            const { exameId } = req.params;
            const exame = await Exames.findByPk(exameId);
            if (!exame) {
                return res.status(400).send({ message: "Exame não encontrado." });
            }

            const {
                exa_nome,
                exa_tipo,
                exa_laboratorio,
                exa_url_documento,
                exa_resultados,
                exa_data,
                exa_hora,
            } = req.body;

            await exameSchema.validate(
                {
                  exa_nome,
                  exa_tipo,
                  exa_laboratorio,
                  exa_url_documento,
                  exa_resultados,
                  exa_data,
                  exa_hora,
                }
            );

            exame.exa_nome = exa_nome;
            exame.exa_tipo = exa_tipo;
            exame.exa_laboratorio = exa_laboratorio;
            exame.exa_url_documento = exa_url_documento;
            exame.exa_resultados = exa_resultados;
            exame.updated_at = new Date();

            await exame.save();

            return res
                .status(201)
                .send({ message: `Exame '${exa_nome}' atualizado com sucesso!` });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).send({
                    message: "Erro na atualização do Exame",
                    cause: error.message
                });
            }

            return res.status(500).send({
                message: "Ocorreu um erro desconhecido",
                cause: error.message
            });
        }
    }

    async remove(req, res) {

        // #swagger.tags = ['Exames']
        // #swagger.summary = 'Remover um exame'
        // #swagger.description = 'Endpoint para remover um exame pelo ID.'
        /* #swagger.parameters['exameId'] = {in: 'path', type: 'integer', description: 'ID do exame a ser removido.'} */
        /* #swagger.parameters["body"] = { 
        in: "body",
        description: "Dados de confirmação para remover o exame",
        type: "object",
        schema: {
            id: 2
        },
        required: true
        } */
        /* #swagger.responses[200] = { 
        description: 'Exame removido com sucesso'
        } */
        /* #swagger.responses[400] = { 
        description: 'Requisição inválida, dados de remoção ausentes ou inválidos',
        schema: { $ref: "#/definitions/examRemove400" }
        } */
        /* #swagger.responses[500] = { 
        description: 'Erro interno do servidor',
        schema: { $ref: "#/definitions/examRemove500" }
        } */

        try {
            const { exameId } = req.params;
            const exame = await Exames.findByPk(exameId);

            if (!exame) {
                return res.status(400).send({ message: "Exame não encontrado." });
            }

            await exame.destroy();
            exame.exa_status = false;
            await exame.save();

            return res.status(202).send({ message: "Exame removido com sucesso." });
        } catch (error) {
            return res.status(500).send({
                message: "Erro ao remover exame",
                cause: error.message
            });
        }
    }

    async findExamesByUser(req, res) {

        // #swagger.tags = ['Exames']
        // #swagger.summary = 'Encontrar exames por nome de usuário'
        // #swagger.description = 'Endpoint para encontrar exames com base no nome do usuário.'
        /* #swagger.parameters['userName'] = {in: 'query', type: 'string', description: 'Nome do usuário para pesquisa.'} */
        /* #swagger.responses[200] = { 
            description: 'Lista de exames encontrados',
            schema: { $ref: "#/definitions/examFindExamsByUser200" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/examFindExamsByUser500" }
        } */

        try {
            const { userName } = req.query;
    
            if (!userName) {
                const exames = await Exames.findAll();
                return res.status(200).send(exames);
            } else {
                const exames = await Exames.findAll({
                    where: {
                        usu_nome: userName,
                    },
                });
    
                return res.status(200).send(exames);
            }
        } catch (error) {
            return res.status(500).send({
                message: "Erro ao buscar os exames do usuário",
                cause: error.message,
            });
        }
    }
    

    async findAllAdmin(req, res) {

        // #swagger.tags = ['Exames']
        // #swagger.summary = 'Listar todos os exames (Admin)'
        // #swagger.description = 'Endpoint para listar todos os exames cadastrados, incluindo os arquivados (Admin).'
        /* #swagger.responses[200] = { 
            description: 'Lista de todos os exames cadastrados (Admin)',
            schema: { $ref: "#/definitions/examFindAllAdmin200" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/examFindAllAdmin500" }
        } */

        try {
            const exames = await Exames.findAll({ paranoid: false });

            return res.status(200).send({ exames });

        } catch (error) {
            return res.status(500).send({
                message: "Erro ao listar exames",
                cause: error.message,
            });
        }
    }

    async findAllByPatient(req, res) {

        // #swagger.tags = ['Exames']
        // #swagger.summary = 'Listar exames de um paciente'
        // #swagger.description = 'Endpoint para listar exames de um paciente com base no ID do paciente.'
        /* #swagger.parameters['pacienteId'] = {in: 'path', type: 'integer', description: 'ID do paciente para listar exames.'} */
        /* #swagger.responses[200] = { 
            description: 'Lista de exames do paciente',
            schema: { $ref: "#/definitions/examFindAllByPatient200" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/examFindAllByPatient500" }
        } */

        try {
            const { pacienteId } = req.params;
            const exames = await Exames.findAll({
                where: {
                  pac_id: pacienteId
                }
              });

            return res.status(200).send(exames);

        } catch (error) {
            return res.status(500).send({
                message: "Erro ao listar exames",
                cause: error.message,
            });
        }
    }
}

module.exports = new ExameController();
