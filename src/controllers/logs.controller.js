const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const { Logs } = require('../models/logs')(sequelize, Sequelize);

class LogsController {
  async listarLogs(req, res) {

    // #swagger.tags = ['Logs']
    // #swagger.summary = 'Listar registros de logs'
    // #swagger.description = 'Endpoint para listar os registros de logs.'
    /* #swagger.responses[200] = { 
      description: 'Lista de registros de logs',
      schema: { $ref: "#/definitions/logsList200" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/logsList500" }
    } */

    try {
      const logs = await Logs.findAll();

      return res.status(200).json(logs);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao listar os registros de logs',
        error: error.message,
      });
    }
  }
}

module.exports = new LogsController();
