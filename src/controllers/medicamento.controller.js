const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const medicamentosSchema = require("../validations/medicamentoValidation"); 
const Medicamentos = require('../models/medicamentos')(sequelize, Sequelize);
const Pacientes = require('../models/pacientes')(sequelize, Sequelize);

class MedicamentosController {
    async create(req, res) {
        try {
            const {
                med_nome,
                med_data,
                med_hora,
                med_tipo,
                med_descricao,
                med_qtd,
                med_unidade,
                med_observacoes,
                pac_id,
            } = req.body;

            await medicamentosSchema.validate(
                {
                    med_nome,
                    med_data,
                    med_hora,
                    med_tipo,
                    med_descricao,
                    med_qtd,
                    med_unidade,
                    med_observacoes,
                    pac_id,
                }
            );

            const medicamentoCreated = await Medicamentos.create({
                med_nome,
                med_data: med_data == null ? new Date() : med_data,
                med_hora: med_hora == null ? new Date() : med_hora,
                med_tipo,
                med_descricao,
                med_qtd,
                med_unidade,
                med_observacoes,
                pac_id,
                created_at: new Date(),
                updated_at: new Date()
            });

            return res.status(201).send(medicamentoCreated);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).send({
                    message: "Erro na criação do Medicamento",
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
            const { medicamentoId } = req.params;
            const medicamento = await Medicamentos.findByPk(medicamentoId);

            if (!medicamento) {
                return res.status(404).send({ message: "Medicamento não encontrado." });
            }

            return res.status(200).send(medicamento);
        } catch (error) {
            return res.status(500).send({
                message: "Não foi possível processar a sua solicitação",
                cause: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const { medicamentoId } = req.params;
            const medicamento = await Medicamentos.findByPk(medicamentoId);
            if (!medicamento) {
                return res.status(400).send({ message: "Medicamento não encontrado." });
            }

            const {
                med_nome,
                med_data,
                med_hora,
                med_tipo,
                med_descricao,
                med_qtd,
                med_unidade,
                med_observacoes,
                pac_id
            } = req.body;

            await medicamentosSchema.validate(
                {
                    med_nome,
                    med_data,
                    med_hora,
                    med_tipo,
                    med_descricao,
                    med_qtd,
                    med_unidade,
                    med_observacoes,
                    pac_id
                }
            );

            medicamento.med_nome = med_nome;
            medicamento.med_data = med_data == null ? new Date() : med_data;
            medicamento.med_hora = med_hora == null ? new Date() : med_hora;
            medicamento.med_tipo = med_tipo;
            medicamento.med_descricao = med_descricao;
            medicamento.med_qtd = med_qtd;
            medicamento.med_unidade = med_unidade;
            medicamento.med_observacoes = med_observacoes;
            medicamento.pac_id = pac_id;
            medicamento.updated_at = new Date();

            await medicamento.save();

            return res
                .status(201)
                .send({ message: `Medicamento '${med_nome}' atualizado com sucesso!` });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).send({
                    message: "Erro na atualização do Medicamento",
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
            const { medicamentoId } = req.params;
            const medicamento = await Medicamentos.findByPk(medicamentoId);

            if (!medicamento) {
                return res.status(400).send({ message: "Medicamento não encontrado." });
            }

            await medicamento.destroy();
            medicamento.med_status = false;
            await medicamento.save();

            return res.status(202).send({ message: "Medicamento removido com sucesso." });
        } catch (error) {
            return res.status(500).send({
                message: "Erro ao remover medicamento",
                cause: error.message
            });
        }
    }

    async findMedicamentosByUser(req, res) {
        try {
            const { userName } = req.query;
    
            if (!userName) {
                const medicamentos = await Medicamentos.findAll();
                return res.status(200).send(medicamentos);
            } else {
                const medicamentos = await Medicamentos.findAll({
                    where: {
                        usu_nome: userName,
                    },
                });
    
                return res.status(200).send(medicamentos);
            }
        } catch (error) {
            return res.status(500).send({
                message: "Erro ao buscar os medicamentos do usuário",
                cause: error.message,
            });
        }
    }

    async findAllByPatient(req, res) {
        try {
            const { pacienteId } = req.params;
            const medicamentos = await Medicamentos.findAll({
                where: {
                    pac_id: pacienteId
                }
            });

            return res.status(200).send(medicamentos);
        } catch (error) {
            return res.status(500).send({
                message: "Erro ao listar medicamentos",
                cause: error.message,
            });
        }
    }
}

module.exports = new MedicamentosController();
