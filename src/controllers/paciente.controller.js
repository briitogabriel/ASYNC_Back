const { Sequelize, Op } = require("sequelize");
const DB_CONFIG = require("../config/database");
const pacienteSchema = require("../validations/pacienteValidation");
const sequelize = new Sequelize(DB_CONFIG);
const Pacientes = require("../models/pacientes")(sequelize, Sequelize);

class PacienteController {
  async create(req, res) {
    try {
      const {
        pac_nome,
        pac_genero,
        pac_nascimento,
        pac_cpf,
        pac_rg,
        pac_estado_civil,
        pac_telefone,
        pac_email,
        pac_naturalidade,
        pac_contato_emergencia,
        pac_alergias,
        pac_cuidados_especiais,
        pac_convenio,
        pac_numero_convenio,
        pac_validade_convenio,
        end_id,
        comp_id,
        usu_id,
      } = req.body;

      await pacienteSchema.validate({
        pac_nome,
        pac_genero,
        pac_nascimento,
        pac_cpf,
        pac_rg,
        pac_estado_civil,
        pac_telefone,
        pac_email,
        pac_naturalidade,
        pac_contato_emergencia,
        pac_alergias,
        pac_cuidados_especiais,
        pac_convenio,
        pac_numero_convenio,
        pac_validade_convenio,
      });

      const cpfInDb = await Pacientes.findOne({
        where: { pac_cpf },
      });

      const emailInDb = await Pacientes.findOne({
        where: { pac_email },
      });

      if (cpfInDb || emailInDb) {
        return res.status(409).send({
          message: "O paciente informado já está cadastrado.",
        });
      }

      await Pacientes.create({
        pac_nome: pac_nome,
        pac_genero: pac_genero,
        pac_nascimento: pac_nascimento,
        pac_cpf: pac_cpf,
        pac_rg: pac_rg,
        pac_estado_civil: pac_estado_civil,
        pac_telefone: pac_telefone,
        pac_email: pac_email,
        pac_naturalidade: pac_naturalidade,
        pac_contato_emergencia: pac_contato_emergencia,
        pac_alergias: pac_alergias,
        pac_cuidados_especiais: pac_cuidados_especiais,
        pac_convenio: pac_convenio,
        pac_numero_convenio: pac_numero_convenio,
        pac_validade_convenio: pac_validade_convenio,
        end_id: end_id,
        comp_id: comp_id,
        usu_id: usu_id,
      });

      return res.status(201).send({
        message: `Paciente ${pac_nome} criado com sucesso!`,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).send({
          message:
            "Erro na criação do paciente, verifique os dados informados.",
          cause: error.errors,
        });
      }

      return res.status(500).send({
        message: "Não foi possível processar a solicitação.",
        cause: error.message,
      });
    }
  }
}

module.exports = new PacienteController();
