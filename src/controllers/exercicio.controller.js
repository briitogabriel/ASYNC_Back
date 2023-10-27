const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const exercicioSchema = require("../validations/exercicioValidation");
const exercicios = require("../models/Exercicios")(sequelize, Sequelize);
// const Pacientes = require("../models/Pacientes")(sequelize, Sequelize);
class ExercicioController {
    async create(req, res) {
        try {
            const {
                exe_nome,
                exe_data,
                exe_hora,
                exe_tipo,
                exe_descricao,
                exe_qtd,
                pac_id,
            } = req.body

            await exercicioSchema.validate(
                {
                    exe_nome,
                    exe_data,
                    exe_hora,
                    exe_tipo,
                    exe_descricao,
                    exe_qtd,
                }
            );
                
            const exercicioCreated = await exercicios.create({
                exe_nome,
                exe_data,
                exe_hora,
                exe_tipo,
                exe_descricao,
                exe_qtd,
                pac_id,
                created_at: new Date(),
                updated_at: new Date()
            })
            return res.status(201).send(exercicioCreated)

        } catch (error) {
            
            if (error.name === 'ValidationError') {
                return res.status(400).send({
                    message: "Erro na criação do Exercício",
                    cause: error.message
                })
            }

            return res.status(500).send({
                message: "Ocorreu um erro desconhecido",
                cause: error.message
            })
        }
    }

    async findAllAdmin(req, res) {
      try {
          const exercicios = await exercicios.findAll({ paranoid: false })

          return res.status(200).send({ exercicios });

      } catch (error) {
          return res.status(500).send({
              message: "Erro ao listar exercicios",
              cause: error.message,
          });
      }
  }
}

module.exports = new ExercicioController()