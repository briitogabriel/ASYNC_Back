const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const exameSchema = require("../validations/exameValidation");
const Exames = require('../models/exames')(sequelize, Sequelize);
//importar pacientes

class ExameController {
    async create(req, res) {
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

  //implementar a pacienteByExame

    async update(req, res) {
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

    async findAllAdmin(req, res) {
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
