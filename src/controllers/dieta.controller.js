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
                cause: error
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
            console.log(pac_id)
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
                message: "Erro ao listar todos os usuários",
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
              cause: error
          })
        }
    }
}

module.exports = new DietaController()