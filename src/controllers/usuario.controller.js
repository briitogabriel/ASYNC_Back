require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
const usuarioSchema = require("../validations/usuarioValidation");
const sequelize = new Sequelize(DB_CONFIG);
const Usuarios = require("../models/usuarios")(sequelize, Sequelize);

class UsuarioController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).send({
          message: "Os dados são obrigatórios.",
          data: null,
          success: false,
        });
      }

      const usuario = await Usuarios.findOne({
        where: { usu_email: email },
      });

      if (!usuario) {
        return res.status(404).send({
          message:
            "Não foi possível realizar a autenticação. Usuário não cadastrado.",
          data: null,
          success: false,
        });
      }

      const isPasswordValid = usuario.usu_senha === senha;

      const token =
        isPasswordValid &&
        jwt.sign(
          {
            id: usuario.usu_id,
            name: usuario.usu_nome,
            email: usuario.usu_email,
          },
          process.env.APP_SECRET,
          {
            expiresIn: 3600,
          }
        );

      if (!isPasswordValid) {
        return res.status(401).send({
          message: "Usuário e/ou senha inválidos.",
        });
      }

      return res.status(200).send({
        message: `Usuário ${usuario.usu_nome} autenticado com sucesso.`,
        data: isPasswordValid ? token : null,
        success: isPasswordValid,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Não conseguimos processar sua solicitação.",
        cause: error.message,
      });
    }
  }

  async resetarSenha(req, res) {
    try {
      const { usu_id, usu_email, usu_senha } = req.body;

      const usuario = await Usuarios.findByPk(usu_id);

      if (!usuario) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      };

      const emailInDb = await Usuarios.findOne({
        where: { usu_email: usu_email },
      });

      if (!emailInDb) {
        return res.status(400).send({ message: "Email não cadastrado." });
      };

      if (!usu_senha) {
        return res.status(400).send({ message: "Informe uma senha válida." });
      };

      if (usu_senha === usuario.usu_senha) {
        return res
          .status(400)
          .send({ message: "A senha já está sendo utilizada." });
      };

      usuario.usu_senha = usu_senha;

      await usuario.save();

      return res.status(200).send();
    } catch (error) {
      return res.status(400).send({
        message: "Erro ao atualizar senha do usuário.",
        cause: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const {
        usu_nome,
        usu_genero,
        usu_cpf,
        usu_telefone,
        usu_email,
        usu_senha,
        usu_status,
        per_id,
      } = req.body;

      await usuarioSchema.validate({
        usu_nome,
        usu_genero,
        usu_cpf,
        usu_telefone,
        usu_email,
        usu_senha,
        usu_status,
      });

      const cpfInDb = await Usuarios.findOne({
        where: { usu_cpf: usu_cpf },
      });

      const emailInDb = await Usuarios.findOne({
        where: { usu_email: usu_email },
      });

      if (cpfInDb || emailInDb) {
        return res.status(409).send({
          message: "Usuário já cadastrado.",
        });
      }

      const usuarioCriado = await Usuarios.create({
        usu_nome: usu_nome,
        usu_genero: usu_genero,
        usu_cpf: usu_cpf,
        usu_telefone: usu_telefone,
        usu_email: usu_email,
        usu_senha: usu_senha,
        usu_status: usu_status,
        usu_campo_busca:
          usu_nome + " | " + usu_cpf + " | " + usu_telefone + " | " + usu_email,
        per_id: per_id,
      });

      return res.status(201).send({
        message: `Usuário ${usuarioCriado.usu_nome} criado com sucesso!`,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Não foi possível processar a solicitação.",
        cause: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const {
        usu_nome,
        usu_genero,
        usu_cpf,
        usu_telefone,
        usu_email,
        usu_senha,
        per_id,
      } = req.body;

      await usuarioSchema.validate({
        usu_nome,
        usu_genero,
        usu_cpf,
        usu_telefone,
        usu_email,
        usu_senha,
      });

      const { usuarioId } = req.params;

      const usuario = await Usuarios.findByPk(usuarioId);

      if (!usuario) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }

      if (usuario.usu_senha !== usu_senha) {
        return res.status(400).send({ message: "Senha incorreta." });
      }

      usuario.usu_nome = usu_nome;
      usuario.usu_genero = usu_genero;
      usuario.usu_telefone = usu_telefone;
      usuario.usu_email = usu_email;
      usuario.per_id = per_id;
      usuario.usu_campo_busca = usu_nome + " | " + usuario.usu_cpf + " | " + usu_telefone + " | " + usu_email;

      await usuario.save();

      return res
        .status(200)
        .send({ message: `Usuário ${usu_nome} atualizado com sucesso!` });
    } catch (error) {
      return res.status(500).send({
        message: "Não conseguimos processar a sua solicitação.",
        cause: error.message,
      });
    }
  }

  async findAll(req, res) {
    try {
      const usuarios = await Usuarios.findAll();

      const usuariosEncontrados = usuarios.map((usuario) => {
        return {
          usuarioId: usuario.usu_id,
          nome: usuario.usu_nome,
          genero: usuario.usu_genero,
          cpf: usuario.usu_cpf,
          telefone: usuario.usu_telefone,
          email: usuario.usu_email,
          status: usuario.usu_status,
          permissao: usuario.per_id,
          createdAt: usuario.createdAt,
          updatedAt: usuario.updatedAt,
        };
      });

      return res.status(200).send(usuariosEncontrados);
    } catch (error) {
      return res.status(500).send({
        message: "Erro ao listar todos os usuários",
        cause: error.message,
      });
    }
  }

  async remove(req, res) {
    try {
      const { usuarioId } = req.params;
      const { id } = req.body;

      const usuario = await Usuarios.findByPk(usuarioId);

      if (!usuario) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }

      if (usuario.usu_id === id) {
        return res.status(401).send({ message: "Operação não autorizada." });
      }

      await usuario.destroy();

      usuario.usu_status = false;

      await usuario.save();

      return res.status(200).send({ message: "Usuário removido com sucesso." });
    } catch (error) {
      return res.status(500).send({
        message: "Erro ao remover usuário",
        cause: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
