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
        con_dosagem_precaucoes,
        con_status
      } = req.body;

      await consultaSchema.validate(
        {
          con_motivo,
          con_data,
          con_hora,
          con_descricao,
          con_medicacao,
          con_dosagem_precaucoes,
          con_status
        }
      );

      consulta.con_motivo = con_motivo
      consulta.con_data_data = con_data
      consulta.con_hora = con_hora
      consulta.con_descricao = con_descricao
      consulta.con_medicacao = con_medicacao
      consulta.con_dosagem_precaucoes = con_dosagem_precaucoes
      consulta.con_status = con_status
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