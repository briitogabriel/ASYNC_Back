const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const { Pacientes } = require('../models/pacientes');
const { Consultas } = require('../models/consultas');
const { Exames } = require('../models/exames');

class EstatisticasController {
  async findAll(req, res) {

    // #swagger.tags = ['Estatísticas']
    // #swagger.summary = 'Obter estatísticas gerais'
    // #swagger.description = 'Endpoint para obter estatísticas gerais, como o total de pacientes, consultas e exames.'
    /* #swagger.responses[200] = { 
      description: 'Estatísticas gerais',
      schema: { $ref: "#/definitions/estatisticasFindAll200" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/estatisticasFindAll500" }
    } */

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
