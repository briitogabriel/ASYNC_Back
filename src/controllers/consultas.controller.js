const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const consultaSchema = require("../validations/consultaValidation");
const Consultas = require('../models/consultas')(sequelize, Sequelize);
const Pacientes = require("../models/pacientes")(sequelize, Sequelize);

class ConsultasController{

  async create(req, res){

    // #swagger.tags = ['Consultas']
    // #swagger.summary = 'Criar uma nova consulta'
    // #swagger.description = 'Endpoint para criar uma nova consulta.'
    /* #swagger.parameters["body"] = { 
      in: "body",
      description: "Dados da nova consulta",
      type: "object",
      schema: {
        con_motivo: "Exame de rotina",
        con_data: "2023-11-05",
        con_hora: "09:00:00",
        con_descricao: "Consulta de rotina",
        con_medicacao: "Paracetamol",
        con_dosagem_precaucoes: "500mg, tomar com comida",
        pac_id: 1
      },
      required: true
    } */
    /* #swagger.responses[201] = { 
      description: 'Consulta criada com sucesso',
      schema: { $ref: "#/definitions/consultaCreate201" }
    } */
    /* #swagger.responses[400] = { 
      description: 'Requisição inválida, dados de consulta ausentes ou inválidos',
      schema: { $ref: "#/definitions/consultaCreate400" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/consultaCreate500" }
    } */

    try {
      const{
        con_motivo,
        con_data,
        con_hora,
        con_descricao,
        con_medicacao,
        con_dosagem_precaucoes,
        pac_id
      } = req.body

      await consultaSchema.validate({
        con_motivo,
        con_data,
        con_hora,
        con_descricao,
        con_medicacao,
        con_dosagem_precaucoes,
      })

      const consultaCreated = await Consultas.create({
        con_motivo,
        con_data: con_data == null ? new Date() : con_data,
        con_hora: con_hora == null ? new Date() : con_hora,
        con_descricao,
        con_medicacao,
        con_dosagem_precaucoes,
        con_status: true,
        pac_id,
        created_at: new Date(),
        updated_at: new Date()
      })

      return res.status(201).send(consultaCreated);

    } catch (error){
      if (error.name === 'ValidationError') {
        return res.status(400).send({
            message: "Erro na criação da Consulta",
            cause: error.message
        })
      }

      return res.status(500).send({
          message: "Ocorreu um erro desconhecido",
          cause: error.message
      })
    }

  }

  async findOne(req, res) {

    // #swagger.tags = ['Consultas']
    // #swagger.summary = 'Buscar consulta por ID'
    // #swagger.description = 'Endpoint para buscar uma consulta pelo ID.'
    /* #swagger.parameters['consultaId'] = {in: 'path', type: 'integer', description: 'ID da consulta a ser buscada.'} */
    /* #swagger.responses[200] = { 
      description: 'Consulta encontrada',
      schema: { $ref: "#/definitions/consultaFindOne200" }
    } */
    /* #swagger.responses[404] = { 
      description: 'Consulta não encontrada',
      schema: { $ref: "#/definitions/consultaFindOne404" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/consultaFindOne500" }
    } */

    try {
      const { consultaId } = req.params;
      const consulta = await Consultas.findByPk(consultaId);

      if (!consulta) {
        return res.status(404).send({ message: "Consulta não encontrada." });
      }

      return res.status(200).send(consulta);
    } catch (error) {
      return res.status(500).send({
        message: "Não foi possível processar a sua solicitação",
        cause: error.message,
      });
    }
  }

  async findAllAdmin(req, res) {

    // #swagger.tags = ['Consultas']
    // #swagger.summary = 'Listar todas as consultas (Admin)'
    // #swagger.description = 'Endpoint para listar todas as consultas (Admin).'
    /* #swagger.responses[200] = { 
      description: 'Lista de todas as consultas',
      schema: { $ref: "#/definitions/consultaFindAllAdmin200" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/consultaFindAllAdmin500" }
    } */

    try {
      const consultas = await Consultas.findAll({ paranoid: false });

      return res.status(200).send(consultas);

    } catch (error) {
      return res.status(500).send({
        message: "Erro ao listar consultas.",
        cause: error.message,
      });
    }
  }

  async findAllByPatient(req, res) {

    // #swagger.tags = ['Consultas']
    // #swagger.summary = 'Listar consultas por ID do paciente'
    // #swagger.description = 'Endpoint para listar consultas por ID do paciente.'
    /* #swagger.parameters['pacienteId'] = {in: 'path', type: 'integer', description: 'ID do paciente.'} */
    /* #swagger.responses[200] = { 
      description: 'Lista de consultas por ID do paciente',
      schema: { $ref: "#/definitions/consultaFindAllByPatient200" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/consultaFindAllByPatient500" }
    } */

    try {
        const { pacienteId } = req.params;
        const consultas = await Consultas.findAll({
            where: {
              pac_id: pacienteId
            }
          });

        return res.status(200).send(consultas);

    } catch (error) {
        return res.status(500).send({
            message: "Erro ao listar consultas",
            cause: error.message,
        });
    }
  }

  async update(req, res) {

    // #swagger.tags = ['Consultas']
    // #swagger.summary = 'Atualizar uma consulta'
    // #swagger.description = 'Endpoint para atualizar uma consulta por meio de seu ID.'
    /* #swagger.parameters['consultaId'] = {in: 'path', type: 'integer', description: 'ID da consulta a ser atualizada.'} */
    /* #swagger.parameters["body"] = { 
      in: "body",
      description: "Dados de atualização da consulta",
      type: "object",
      schema: {
        con_motivo: "Consulta de rotina",
        con_data: "2023-11-06",
        con_hora: "10:00:00",
        con_descricao: "Consulta de rotina atualizada",
        con_medicacao: "Ibuprofeno",
        con_dosagem_precaucoes: "400mg, tomar com água",
      },
      required: true
    } */
    /* #swagger.responses[201] = { 
      description: 'Consulta atualizada com sucesso',
      schema: { $ref: "#/definitions/consultaUpdate201" }
    } */
    /* #swagger.responses[400] = { 
      description: 'Requisição inválida, dados de consulta ausentes ou inválidos',
      schema: { $ref: "#/definitions/consultaUpdate400" }
    } */
    /* #swagger.responses[404] = { 
      description: 'Consulta não encontrada',
      schema: { $ref: "#/definitions/consultaUpdate404" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/consultaUpdate500" }
    } */

    try {    
      const { consultaId } = req.params;
      const consulta = await Consultas.findByPk(consultaId);
      if (!consulta) {
        return res.status(400).send({ message: "Consulta não encontrada." });
      }

      const { 
        con_motivo,
        con_data,
        con_hora,
        con_descricao,
        con_medicacao,
        con_dosagem_precaucoes
      } = req.body;

      await consultaSchema.validate(
        {
          con_motivo,
          con_data,
          con_hora,
          con_descricao,
          con_medicacao,
          con_dosagem_precaucoes
        }
      );

      consulta.con_motivo = con_motivo
      consulta.con_data_data = con_data
      consulta.con_hora = con_hora
      consulta.con_descricao = con_descricao
      consulta.con_medicacao = con_medicacao
      consulta.con_dosagem_precaucoes = con_dosagem_precaucoes
      consulta.updated_at = new Date()

      await consulta.save();

      return res
        .status(201)
        .send({ message: `Consulta atualizada com sucesso!` })
    
    } catch (error) {
        
      if (error.name === 'ValidationError') {
          return res.status(400).send({
              message: "Erro na atualização de Consulta",
              cause: error.message
          })
      }

      return res.status(500).send({
          message: "Ocorreu um erro desconhecido",
          cause: error.message
      })
    }
  }

  async remove(req, res) {

    // #swagger.tags = ['Consultas']
    // #swagger.summary = 'Remover uma consulta'
    // #swagger.description = 'Endpoint para remover uma consulta por meio de seu ID.'
    /* #swagger.parameters['consultaId'] = {in: 'path', type: 'integer', description: 'ID da consulta a ser removida.'} */
    /* #swagger.parameters["body"] = { 
      in: "body",
      description: "Dados de confirmação para remover a consulta",
      type: "object",
      schema: {
        id: 2
      },
      required: true
    } */
    /* #swagger.responses[202] = { 
      description: 'Consulta removida com sucesso'
    } */
    /* #swagger.responses[400] = { 
      description: 'Requisição inválida, dados de remoção ausentes ou inválidos',
      schema: { $ref: "#/definitions/consultaRemove400" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/consultaRemove500" }
    } */

    try {
        const { consultaId } = req.params;
        const consulta = await Consultas.findByPk(consultaId);

        if (!consulta) {
            return res.status(400).send({ message: "Consulta não encontrada." });
        }

        await consulta.destroy();
        consulta.con_status = false;
        await consulta.save();

        return res.status(202).send({ message: "Consulta removida com sucesso." });

    } catch (error) {
        return res.status(500).send({
            message: "Erro ao remover consulta",
            cause: error.message
        });
    }
  }

}

module.exports = new ConsultasController()