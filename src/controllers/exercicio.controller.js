const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const exercicioSchema = require("../validations/exercicioValidation");
const Exercicios = require("../models/Exercicios")(sequelize, Sequelize);
const Pacientes = require("../models/Pacientes")(sequelize, Sequelize);
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
                
            const exercicioCreated = await Exercicios.create({
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

    async findAllByPatient(req, res) {
        try {
            const { pac_nome } = req.body
            const patientData = !pac_nome ? '' : await Pacientes.findAll({ where: {
                pac_nome: {
                    [Op.iLike]: `%${pac_nome}%`
                }
            }});
            
            const pac_id = patientData.length > 0 ? patientData.map(patient => patient.dataValues.pac_id) : null
            const exercicios = pac_id
                ? await Exercicios.findAll({ where: { pac_id: pac_id } })
                : await Exercicios.findAll()

            return res.status(200).send({
                message: pac_id
                    ? `Exercicios encontrados (${patientData.map(patient => patient.dataValues.pac_nome)})`
                    : 'Paciente não encontrado',
                data: exercicios
            });

        } catch (error) {
            return res.status(500).send({
                message: "Erro ao listar exercicios",
                cause: error.message,
            });
        }
    }
  
    async update(req, res) {
        try {    
          const { exercicioId } = req.params;
          const exercicio = await Exercicios.findByPk(exercicioId);
          if (!exercicio) {
            return res.status(400).send({ message: "Exercicio não encontrado." });
          }

          const { 
            exe_nome,
            exe_data,
            exe_hora,
            exe_tipo,
            exe_descricao,
            exe_qtd,
          } = req.body;

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
    
          exercicio.exe_nome = exe_nome
          exercicio.exe_data = exe_data
          exercicio.exe_hora = exe_hora
          exercicio.exe_tipo = exe_tipo
          exercicio.exe_descricao = exe_descricao
          exercicio.exe_qtd = exe_qtd
          exercicio.updated_at = new Date()
    
          await exercicio.save();
    
          return res
            .status(201)
            .send({ message: `Exercicio '${exe_nome}' atualizado com sucesso!` });
        } catch (error) {
            
          if (error.name === 'ValidationError') {
              return res.status(400).send({
                  message: "Erro na atualização do Exercicio",
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
            const { exercicioId } = req.params;

            const exercicio = await Exercicios.findByPk(exercicioId);

            if (!exercicio) {
              return res.status(400).send({message: "Exercicio não encontrado."})
            };

            await exercicio.destroy();
            exercicio.exe_status = false;
            await exercicio.save();

            return res.status(202).send({message: "Exercicio removido com sucesso."})
        } catch (error) {
            return res.status(500).send({
              message: "Erro ao remover exercicio",
              cause: error.message
            });
        };
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