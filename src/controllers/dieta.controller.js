const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const dietaSchema = require("../validations/dietaValidation");
const Dietas = require('../models/Dietas')(sequelize, Sequelize);
const Pacientes = require("../models/Pacientes")(sequelize, Sequelize);
class DietaController {
    async create(req, res) {
        try {
            const {
                die_nome,
                die_data,
                die_hora,
                die_tipo,
                die_descricao,
                pac_id,
            } = req.body

            await dietaSchema.validate(
                {
                  die_nome,
                  die_data,
                  die_hora,
                  die_tipo,
                  die_descricao,
                }
              );
            
            const dietaCreated = await Dietas.create({
                die_nome,
                die_data,
                die_hora,
                die_tipo,
                die_descricao,
                pac_id,
                created_at: new Date(),
                updated_at: new Date()
            })
            return res.status(201).send(dietaCreated)

        } catch (error) {
            
            if (error.name === 'ValidationError') {
                return res.status(400).send({
                    message: "Erro na criação da Dieta",
                    cause: error.message
                })
            }

            return res.status(500).send({
                message: "Ocorreu um erro desconhecido",
                cause: error.message
            })
        }
    }

    async findAllByPatient(req, res) {
        try {
            const { pac_nome } = req.body
            const patientData = !pac_nome ? '' : await Pacientes.findAll({ where: {
                pac_nome: {
                    [Op.iLike]: `%${pac_nome}%`
                }
            }});
            
            const pac_id = patientData.length > 0 ? patientData.map(patient => patient.dataValues.pac_id) : null
            const dietas = pac_id
                ? await Dietas.findAll({ where: { pac_id: pac_id } })
                : await Dietas.findAll()

            return res.status(200).send({
                message: pac_id
                    ? `Dietas encontradas (${patientData.map(patient => patient.dataValues.pac_nome)})`
                    : 'Paciente não encontrado',
                data: dietas
            });

        } catch (error) {
            return res.status(500).send({
                message: "Erro ao listar dietas",
                cause: error.message,
            });
        }
    }
  
    async update(req, res) {
        try {    
          const { dietaId } = req.params;
          const dieta = await Dietas.findByPk(dietaId);
          if (!dieta) {
            return res.status(400).send({ message: "Dieta não encontrada." });
          }

          const { 
            die_nome,
            die_data,
            die_hora,
            die_tipo,
            die_descricao
          } = req.body;

          await dietaSchema.validate(
            {
              die_nome,
              die_data,
              die_hora,
              die_tipo,
              die_descricao,
            }
          );
    
          dieta.die_nome = die_nome
          dieta.die_data = die_data
          dieta.die_hora = die_hora
          dieta.die_tipo = die_tipo
          dieta.die_descricao = die_descricao
          dieta.updated_at = new Date()
    
          await dieta.save();
    
          return res
            .status(201)
            .send({ message: `Dieta '${die_nome}' atualizada com sucesso!` });
        } catch (error) {
            
          if (error.name === 'ValidationError') {
              return res.status(400).send({
                  message: "Erro na atualização da Dieta",
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
            const { dietaId } = req.params;

            const dieta = await Dietas.findByPk(dietaId);

            if (!dieta) {
              return res.status(400).send({message: "Dieta não encontrada."})
            };

            await dieta.destroy();
            dieta.die_status = false;
            await dieta.save();

            return res.status(202).send({message: "Dieta removida com sucesso."})
        } catch (error) {
            return res.status(500).send({
              message: "Erro ao remover dieta",
              cause: error.message
            });
        };
    }

    async findAllAdmin(req, res) {
      try {
          const dietas = await Dietas.findAll({ paranoid: false })

          return res.status(200).send({ dietas });

      } catch (error) {
          return res.status(500).send({
              message: "Erro ao listar dietas",
              cause: error.message,
          });
      }
  }
}

module.exports = new DietaController()