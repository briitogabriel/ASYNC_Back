const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
const pacienteSchema = require("../validations/pacienteValidation");
const sequelize = new Sequelize(DB_CONFIG);
const Complementos = require("../models/Complementos")(sequelize, Sequelize);
const Enderecos = require("../models/enderecos")(sequelize, Sequelize);
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
        end_cep,
        end_cidade,
        end_estado,
        end_logradouro,
        comp_numero,
        comp_complemento,
        comp_bairro,
        comp_ponto_referencia,
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
        end_cep,
        end_cidade,
        end_estado,
        end_logradouro,
        comp_numero,
        comp_complemento,
        comp_bairro,
        comp_ponto_referencia,
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

      const cepCadastrado = await Enderecos.findOne({
        where: { end_cep },
      });

      if (!cepCadastrado) {
        await Enderecos.create({
          end_cep,
          end_cidade,
          end_estado,
          end_logradouro,
        });
      }

      const endInDb = await Enderecos.findOne({
        where: { end_cep },
      });

      const complemento = await Complementos.create({
        comp_numero,
        comp_complemento,
        comp_bairro,
        comp_ponto_referencia,
      });

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
        end_id: endInDb.end_id,
        comp_id: complemento.comp_id,
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

  async update(req, res) {
    try {
      const { pacienteId } = req.params;

      const paciente = await Pacientes.findByPk(pacienteId);

      if (!paciente) {
        return res.status(400).send({ message: "Paciente não encontrado." });
      }

      await pacienteSchema.validate(req.body);

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
        pac_status,
        end_cep,
        end_cidade,
        end_estado,
        end_logradouro,
        comp_numero,
        comp_complemento,
        comp_bairro,
        comp_ponto_referencia,
      } = req.body;

      let endereco = await Enderecos.findOne({
        where: { end_cep },
      });

      if (!endereco) {
        endereco = await Enderecos.create({
          end_cep,
          end_cidade,
          end_estado,
          end_logradouro,
        });
      }

      let complemento = await Complementos.findOne({
        where: {
          comp_numero,
          comp_bairro,
          comp_complemento,
          comp_ponto_referencia,
        },
      });

      if (!complemento) {
        complemento = await Complementos.create({
          comp_numero,
          comp_complemento,
          comp_bairro,
          comp_ponto_referencia,
        });
      }

      paciente.pac_nome = pac_nome;
      paciente.pac_genero = pac_genero;
      paciente.pac_nascimento = pac_nascimento;
      paciente.pac_cpf = pac_cpf;
      paciente.pac_rg = pac_rg;
      paciente.pac_estado_civil = pac_estado_civil;
      paciente.pac_telefone = pac_telefone;
      paciente.pac_email = pac_email;
      paciente.pac_naturalidade = pac_naturalidade;
      paciente.pac_contato_emergencia = pac_contato_emergencia;
      paciente.pac_alergias = pac_alergias;
      paciente.pac_cuidados_especiais = pac_cuidados_especiais;
      paciente.pac_convenio = pac_convenio;
      paciente.pac_numero_convenio = pac_numero_convenio;
      paciente.pac_validade_convenio = pac_validade_convenio;
      paciente.pac_status = pac_status;
      paciente.end_id = endereco.end_id;
      paciente.comp_id = complemento.comp_id;

      await paciente.save();

      return res.status(200).send({
        message: `Usuário ${paciente.pac_nome} atualizado com sucesso.`,
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

  async findAll(req, res) {
    try {
      const pacientes = await Pacientes.findAll();

      return res.status(200).send(pacientes);
    } catch (error) {
      return res.status(500).send({
        message: "Erro ao listar pacientes.",
        cause: error.message,
      });
    }
  }

  async findOne(req, res) {
    try {
      const { pacienteId } = req.params;

      const paciente = await Pacientes.findByPk(pacienteId);

      if (!paciente) {
        return res.status(404).send({ message: "Paciente não encontrado." });
      }

      return res.status(200).send(paciente);
    } catch (error) {
      return res.status(500).send({
        message: "Não foi possível processar a sua solicitação",
        cause: error.message,
      });
    }
  }

  async remove(req, res) {
    try {
      const { pacienteId } = req.params;

      const paciente = await Pacientes.findByPk(pacienteId);

      if (!paciente) {
        return res.status(404).send({message: "Paciente não encontrado."})
      };

      await paciente.destroy();

      paciente.pac_status = false;
      await paciente.save();
      
      return res.status(202).send({message: "Paciente removido com sucesso."})
    } catch (error) {
      return res.status(500).send({
        message: "Erro ao remover paciente",
        cause: error.message,
      });
    }
  }

}

module.exports = new PacienteController();
