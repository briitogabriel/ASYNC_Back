require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
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
      return res.status(500).send({
        message: "Não conseguimos processar sua solicitação.",
        cause: error.message,
      });
    }
  }

  async resetarSenha(req, res) {
    try {
      const { usuarioId, email, novaSenha } = req.body;

      const usuario = await Usuarios.findByPk(usuarioId);

      if (!usuario) {
        return res.status(400).send({ message: "Usuário não encontrado." });
      }

      const emailInDb = await Usuarios.findOne({
        where: { usu_email: email },
      });

      if (!emailInDb) {
        return res.status(400).send({ message: "Email não cadastrado." });
      }

      if (!novaSenha) {
        return res.status(400).send({ message: "Informe uma senha válida." });
      }

      if (novaSenha === usuario.usu_senha) {
        return res
          .status(400)
          .send({ message: "A senha já está sendo utilizada." });
      }

      usuario.usu_senha = novaSenha;

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
      const camposObrigatorios = [
        "nome",
        "genero",
        "cpf",
        "telefone",
        "email",
        "senha",
        "status",
        "campo_busca",
        "per_id",
      ];

      for (const campo of camposObrigatorios) {
        if (!req.body[campo]) {
          return res.status(400).send({
            message: `O campo ${campo} é obrigatório.`,
          });
        }
      }

      const cpfInDb = await Usuarios.findOne({
        where: { usu_cpf: req.body.cpf },
      });

      const emailInDb = await Usuarios.findOne({
        where: { usu_email: req.body.email },
      });

      if (cpfInDb || emailInDb) {
        return res.status(409).send({
          message: "Usuário já cadastrado.",
        });
      }

      const usuarioCriado = await Usuarios.create({
        usu_nome: req.body.nome,
        usu_genero: req.body.genero,
        usu_cpf: req.body.cpf,
        usu_telefone: req.body.telefone,
        usu_email: req.body.email,
        usu_senha: req.body.senha,
        usu_status: req.body.status,
        usu_campo_busca: req.body.campo_busca,
        per_id: req.body.per_id,
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
      const camposObrigatorios = [
        "nome",
        "genero",
        "telefone",
        "senha",
        "per_id",
      ];

      for (const campo of camposObrigatorios) {
        if (!req.body[campo]) {
          return res.status(400).send({
            message: `O campo ${campo} é obrigatório.`,
          });
        }
      }

      const { usuarioId } = req.params;
      const { nome, genero, telefone, senha, per_id } = req.body;

      const usuario = await Usuarios.findByPk(usuarioId);

      if (!usuario) {
        return res.status(400).send({ message: "Usuário não encontrado." });
      }

      if (usuario.usu_senha !== senha) {
        return res.status(400).send({ message: "Senha incorreta." });
      }

      usuario.usu_nome = nome;
      usuario.usu_genero = genero;
      usuario.usu_telefone = telefone;
      usuario.per_id = per_id;

      await usuario.save();

      return res
        .status(200)
        .send({ message: `Usuário ${nome} atualizado com sucesso!` });
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
}

module.exports = new UsuarioController();
