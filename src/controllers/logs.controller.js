const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const { Logs } = require('../models/logs')(sequelize, Sequelize);

class LogsController {
  async listarLogs(req, res) {
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
