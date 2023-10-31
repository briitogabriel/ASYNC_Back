const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const consultaSchema = require("../validations/consultaValidation");
const Consultas = require('../models/consultas')(sequelize, Sequelize);
const Pacientes = require("../models/pacientes")(sequelize, Sequelize);

class ConsultasController{

  async create(req, res){
    try {
      const{
        con_motivo,
        con_data,
        con_hora,
        con_descricao,
        con_medicacao,
        con_dosagem_precaucoes,
        con_status,
        pac_id
      } = req.body

      await consultaSchema.validate({
        con_motivo,
        con_data,
        con_hora,
        con_descricao,
        con_medicacao,
        con_dosagem_precaucoes,
        con_status
      })

      const consultaCreated = await Consultas.create({
        con_motivo,
        con_data,
        con_hora,
        con_descricao,
        con_medicacao,
        con_dosagem_precaucoes,
        con_status,
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

  async findAll(req, res) {
    try {
      const consultas = await Consultas.findAll();

      return res.status(200).send(consultas);
    } catch (error) {
      return res.status(500).send({
        message: "Erro ao listar consultas.",
        cause: error.message,
      });
    }
  }

}

module.exports = new ConsultasController()