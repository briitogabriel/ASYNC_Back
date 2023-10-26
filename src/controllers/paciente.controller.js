const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);

const Pacientes = require("../models/Pacientes")(sequelize, Sequelize);

class PacienteController {
    
    async findAllPaciente(req, res) {
        try {
            const pacientes = await Pacientes.findAll({ paranoid: false })

            return res.status(200).send(pacientes);

        } catch (error) {
            return res.status(500).send({
                message: "Erro ao listar pacientes",
                cause: error.message,
            });
        }
    }
}

module.exports = new PacienteController()