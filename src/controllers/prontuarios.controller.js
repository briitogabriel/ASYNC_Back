const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
const pacienteSchema = require("../validations/pacienteValidation");
const sequelize = new Sequelize(DB_CONFIG);
const Pacientes = require("../models/pacientes")(sequelize, Sequelize);

class ProntuarioController {
  async findAll(req, res) {

    // #swagger.tags = ['Prontuários']
    // #swagger.summary = 'Listar pacientes'
    // #swagger.description = 'Endpoint para listar pacientes.'
    /* #swagger.parameters['nome'] = {in: 'query', description: 'Nome do paciente para filtrar resultados.', type: 'string'} */
    /* #swagger.parameters['pacienteId'] = {in: 'query', description: 'Código identificador do paciente para busca específica.', type: 'integer'} */
    /* #swagger.responses[200] = { 
      description: 'Lista de pacientes',
      schema: { $ref: "#/definitions/pacientesFindAll200" }
    } */
    /* #swagger.responses[400] = { 
      description: 'Requisição inválida, informe nome ou pacienteId, não ambos',
      schema: { $ref: "#/definitions/pacientesFindAll400" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/pacientesFindAll500" }
    } */

    try {
      const { nome, pacienteId } = req.query;

      if (nome && pacienteId) {
        return res.status(400).send({ message: "Informe o nome ou o código identificador do paciente." });
      }

      let pacientes;

      if (nome) {
        pacientes = await Pacientes.findAll({   
          where: {
            pac_nome: {
              [Sequelize.Op.like]: `%${nome}%`
            }
        } });
      } else if (pacienteId) {
        pacientes = await Pacientes.findByPk(pacienteId);
      } else {
        pacientes = await Pacientes.findAll();
      }

      return res.status(200).send(pacientes);
    } catch (error) {
      return res.status(500).send({
        message: "Não foi possível listar os prontuários.",
        cause: error.message,
      });
    }
  }
}

module.exports = new ProntuarioController();
