const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const medicamentosSchema = require("../validations/medicamentoValidation"); 
const Medicamentos = require('../models/medicamentos')(sequelize, Sequelize);
const Pacientes = require('../models/pacientes')(sequelize, Sequelize);

class MedicamentosController {
    async create(req, res) {

        // #swagger.tags = ['Medicamentos']
        // #swagger.summary = 'Criar um novo medicamento'
        // #swagger.description = 'Endpoint para criar um novo medicamento.'
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados do novo medicamento",
            type: "object",
            schema: {
            med_nome: "Medicamento X",
            med_data: "2023-11-10",
            med_hora: "08:00",
            med_tipo: "Comprimido",
            med_descricao: "Descrição do medicamento",
            med_qtd: 1,
            med_unidade: "unidade",
            med_observacoes: "Observações do medicamento",
            pac_id: 1
            },
            required: true
        } */
        /* #swagger.responses[201] = { 
            description: 'Medicamento criado com sucesso',
            schema: { $ref: "#/definitions/medicamentoCreate201" }
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de medicamento ausentes ou inválidos',
            schema: { $ref: "#/definitions/medicamentoCreate400" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/medicamentoCreate500" }
        } */

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

        // #swagger.tags = ['Medicamentos']
        // #swagger.summary = 'Encontrar um medicamento'
        // #swagger.description = 'Endpoint para encontrar um medicamento por seu ID.'
        /* #swagger.parameters['medicamentoId'] = {in: 'path', type: 'integer', description: 'ID do medicamento a ser encontrado.'} */
        /* #swagger.responses[200] = { 
            description: 'Medicamento encontrado',
            schema: { $ref: "#/definitions/medicamentoFindOne200" }
        } */
        /* #swagger.responses[404] = { 
            description: 'Medicamento não encontrado',
            schema: { $ref: "#/definitions/medicamentoFindOne404" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/medicamentoFindOne500" }
        } */

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

        // #swagger.tags = ['Medicamentos']
        // #swagger.summary = 'Atualizar um medicamento'
        // #swagger.description = 'Endpoint para atualizar um medicamento por meio de seu ID.'
        /* #swagger.parameters['medicamentoId'] = {in: 'path', type: 'integer', description: 'ID do medicamento a ser atualizado.'} */
        /* #swagger.parameters["body"] = { 
            in: "body",
            description: "Dados de atualização do medicamento",
            type: "object",
            schema: {
            med_nome: "Medicamento Y",
            med_data: "2023-11-11",
            med_hora: "12:00",
            med_tipo: "Gotas",
            med_descricao: "Nova descrição do medicamento",
            med_qtd: 2,
            med_unidade: "ml",
            med_observacoes: "Novas observações do medicamento",
            pac_id: 2
            },
            required: true
        } */
        /* #swagger.responses[200] = { 
            description: 'Medicamento atualizado com sucesso',
            schema: { $ref: "#/definitions/medicamentoUpdate200" }
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de medicamento ausentes ou inválidos',
            schema: { $ref: "#/definitions/medicamentoUpdate400" }
        } */
        /* #swagger.responses[404] = { 
            description: 'Medicamento não encontrado',
            schema: { $ref: "#/definitions/medicamentoUpdate404" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/medicamentoUpdate500" }
        } */

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

        // #swagger.tags = ['Medicamentos']
        // #swagger.summary = 'Remover um medicamento'
        // #swagger.description = 'Endpoint para remover um medicamento por meio de seu ID.'
        /* #swagger.parameters['medicamentoId'] = {in: 'path', type: 'integer', description: 'ID do medicamento a ser removido.'} */
        /* #swagger.responses[200] = { 
            description: 'Medicamento removido com sucesso'
        } */
        /* #swagger.responses[400] = { 
            description: 'Requisição inválida, dados de remoção ausentes ou inválidos',
            schema: { $ref: "#/definitions/medicamentoRemove400" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/medicamentoRemove500" }
        } */

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

        // #swagger.tags = ['Medicamentos']
        // #swagger.summary = 'Encontrar medicamentos de um usuário'
        // #swagger.description = 'Endpoint para encontrar medicamentos de um usuário por seu nome.'
        /* #swagger.parameters['userName'] = {in: 'query', type: 'string', description: 'Nome do usuário para buscar medicamentos.'} */
        /* #swagger.responses[200] = { 
            description: 'Medicamentos encontrados',
            schema: { $ref: "#/definitions/medicamentoFindMedicamentosByUser200" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/medicamentoFindMedicamentosByUser500" }
        } */

        try {
            const { pacienteId } = req.params;
    
            if (!pacienteId) {
                const medicamentos = await Medicamentos.findAll();
                return res.status(200).send(medicamentos);
            } else {
                const medicamentos = await Medicamentos.findAll({
                    where: {
                        pac_id: pacienteId,
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

        // #swagger.tags = ['Medicamentos']
        // #swagger.summary = 'Listar medicamentos por paciente'
        // #swagger.description = 'Endpoint para listar medicamentos de um paciente por meio de seu ID.'
        /* #swagger.parameters['pacienteId'] = {in: 'path', type: 'integer', description: 'ID do paciente para listar medicamentos.'} */
        /* #swagger.responses[200] = { 
            description: 'Lista de medicamentos do paciente',
            schema: { $ref: "#/definitions/medicamentoFindAllByPatient200" }
        } */
        /* #swagger.responses[500] = { 
            description: 'Erro interno do servidor',
            schema: { $ref: "#/definitions/medicamentoFindAllByPatient500" }
        } */

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
