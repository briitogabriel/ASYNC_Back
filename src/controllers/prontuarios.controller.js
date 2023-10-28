const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
const pacienteSchema = require("../validations/pacienteValidation");
const sequelize = new Sequelize(DB_CONFIG);
const Pacientes = require("../models/pacientes")(sequelize, Sequelize);

class ProntuarioController {
  async findAll(req, res) {
    try {
      const { nome, pacienteId } = req.query;

      if (nome && pacienteId) {
        return res.status(400).send({ message: "Informe o nome ou o código identificador do paciente." });
      }

      let pacientes;

      if (nome) {
        pacientes = await Pacientes.findAll({ where: { nome: nome } });
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
