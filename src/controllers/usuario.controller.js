require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
const { response } = require("express");
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
        return res.status(400).send({
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
      return res.status(400).send({
        message: "Erro ao realizar o login do usuário.",
        cause: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const requiredFields = [
        "usu_nome",
        "usu_genero",
        "usu_cpf",
        "usu_telefone",
        "usu_email",
        "usu_senha",
        "usu_status",
        "usu_campo_busca",
        "per_id",
      ];

      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).send({
            message: `O campo ${field} é obrigatório.`,
          });
        }
      }

      const cpfInDb = await Usuarios.findOne({
        where: { usu_cpf: req.body.usu_cpf },
      });

      const emailInDb = await Usuarios.findOne({
        where: { usu_email: req.body.usu_email },
      });

      if (cpfInDb || emailInDb) {
        return res.status(409).send({
          message: "Usuário já cadastrado.",
        });
      }

      const usuarioCriado = await Usuarios.create({
        usu_nome: req.body.usu_nome,
        usu_genero: req.body.usu_genero,
        usu_cpf: req.body.usu_cpf,
        usu_telefone: req.body.usu_telefone,
        usu_email: req.body.usu_email,
        usu_senha: req.body.usu_senha,
        usu_status: req.body.usu_status,
        usu_campo_busca: req.body.usu_campo_busca,
        per_id: req.body.per_id,
      });

      return res
        .status(201)
        .send({
          message: `Usuário ${usuarioCriado.usu_nome} criado com sucesso!`,
        });
    } catch (error) {
      return res.status(400).send({
        message: "Erro na criação do usuário.",
        cause: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
