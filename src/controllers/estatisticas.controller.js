const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const { Pacientes } = require('../models/pacientes');
const { Consultas } = require('../models/consultas');
const { Exames } = require('../models/exames');

class EstatisticasController {
  async findAll(req, res) {
    try {

      const pacientesCount = await Pacientes.count();
      const consultasCount = await Consultas.count();
      const examesCount = await Exames.count();

      const totalPacientes = pacientesCount;
      const totalConsultas = consultasCount;
      const totalExames = examesCount;

      const estatisticas = {
        totalPacientes,
        totalConsultas,
        totalExames,

      };

      return res.status(200).json(estatisticas);
    } catch (error) {
      return res.status(500).json({
        message: 'Não foi possível acessar as informações solicitadas.',
        error: error.message,
      });
    }
  }
}

module.exports = new EstatisticasController();
