require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
const usuarioSchema = require("../validations/usuarioValidation");
const sequelize = new Sequelize(DB_CONFIG);
const Usuarios = require("../models/usuarios")(sequelize, Sequelize);
const Permissoes = require("../models/permissoes")(sequelize, Sequelize);

class UsuarioController {
  async login(req, res) {

    // #swagger.tags = ['Autenticação']
    // #swagger.summary = 'Login de usuário'
    // #swagger.description = 'Endpoint para autenticar um usuário.'
    /* #swagger.parameters["body"] = { 
      in: "body",
      description: "Dados de login",
      type: "object",
      schema: {
        email: "user@example.com",
        senha: "password123"
      },
      required: true
    } */
    /* #swagger.responses[200] = { 
      description: 'Autenticação bem-sucedida',
      schema: { $ref: "#/definitions/userLogin200" }
    } */
    /* #swagger.responses[400] = { 
      description: 'Requisição inválida, dados de login ausentes',
      schema: { $ref: "#/definitions/userLogin400" }
    } */
    /* #swagger.responses[401] = { 
      description: 'Usuário e/ou senha inválidos',
      schema: { $ref: "#/definitions/userLogin401" }
    } */
    /* #swagger.responses[404] = { 
      description: 'Usuário não cadastrado',
      schema: { $ref: "#/definitions/userLogin404" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/userLogin500" }
    } */

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
        data: isPasswordValid ? { token: token, user: usuario } : null,
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
    
    // #swagger.tags = ['Autenticação']
    // #swagger.summary = 'Redefinir senha de usuário'
    // #swagger.description = 'Endpoint para redefinir a senha de um usuário.'
    /* #swagger.parameters["body"] = { 
      in: "body",
      description: "Dados para redefinir a senha",
      type: "object",
      schema: {
        usu_id: 1,
        usu_email: "user@example.com",
        usu_senha: "newpassword123"
      },
      required: true
    } */
    /* #swagger.responses[200] = { 
      description: 'Senha redefinida com sucesso'
    } */
    /* #swagger.responses[400] = { 
      description: 'Dados ausentes ou inválidos para redefinir a senha',
      schema: { $ref: "#/definitions/userResetSenha400" }
    } */
    /* #swagger.responses[404] = { 
      description: 'Usuário não encontrado',
      schema: { $ref: "#/definitions/userResetSenha404" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/userResetSenha500" }
    } */

    try {
      const { usu_id, usu_email, usu_senha } = req.body;

      const usuario = await Usuarios.findByPk(usu_id);

      if (!usuario) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }

      const emailInDb = await Usuarios.findOne({
        where: { usu_email: usu_email },
      });

      if (!emailInDb) {
        return res.status(400).send({ message: "Email não cadastrado." });
      }

      if (!usu_senha) {
        return res.status(400).send({ message: "Informe uma senha válida." });
      }

      if (usu_senha === usuario.usu_senha) {
        return res
          .status(400)
          .send({ message: "A senha já está sendo utilizada." });
      }

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

    // #swagger.tags = ['Usuários]
    // #swagger.summary = 'Criar um novo usuário'
    // #swagger.description = 'Endpoint para criar um novo usuário.'
    /* #swagger.parameters["body"] = { 
      in: "body",
      description: "Dados do novo usuário",
      type: "object",
      schema: {
        usu_nome: "John Doe",
        usu_genero: "male",
        usu_cpf: "123.456.789-10",
        usu_telefone: "(21) 9 8888 7777",
        usu_email: "john_doe@example.com",
        usu_senha: "password123",
        usu_status: true,
        per_nome: "admin"
      },
      required: true
    } */
    /* #swagger.responses[201] = { 
      description: 'Usuário criado com sucesso',
      schema: { $ref: "#/definitions/userCreate201" }
    } */
    /* #swagger.responses[400] = { 
      description: 'Requisição inválida, dados de usuário ausentes ou inválidos',
      schema: { $ref: "#/definitions/userCreate400" }
    } */
    /* #swagger.responses[409] = { 
      description: 'Usuário já cadastrado com o mesmo CPF ou email',
      schema: { $ref: "#/definitions/userCreate409" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/userCreate500" }
    } */

    try {
      const {
        usu_nome,
        usu_genero,
        usu_cpf,
        usu_telefone,
        usu_email,
        usu_senha,
        usu_status,
        per_nome,
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

      const permissao = await Permissoes.findOne({ where: { per_nome } });

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
        per_id: permissao.per_id,
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

    // #swagger.tags = ['Usuários]
    // #swagger.summary = 'Atualizar um usuário'
    // #swagger.description = 'Endpoint para atualizar um usuário por meio de seu Id.'
    /* #swagger.parameters['id'] = {in: 'path', type: 'integer', description: 'ID do usuário.'} */
    /* #swagger.parameters["body"] = { 
      in: "body",
      description: "Dados de atualização do usuário",
      type: "object",
      schema: {
        usu_nome: "Jane Doe",
        usu_genero: "female",
        usu_cpf: "987.654.321-00",
        usu_telefone: "(21) 6 5555 4444",
        usu_email: "jane_doe@example.com",
        usu_senha: "newpassword123",
        per_nome: "admin"
      },
      required: true
    } */
    /* #swagger.responses[200] = { 
      description: 'Usuário atualizado com sucesso',
      schema: { $ref: "#/definitions/userUpdate200" }
    } */
    /* #swagger.responses[400] = { 
      description: 'Requisição inválida, dados de usuário ausentes ou inválidos',
      schema: { $ref: "#/definitions/userUpdate400" }
    } */
    /* #swagger.responses[404] = { 
      description: 'Usuário não encontrado',
      schema: { $ref: "#/definitions/userUpdate404" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/userUpdate500" }
    } */

    try {
      const {
        usu_nome,
        usu_genero,
        usu_cpf,
        usu_telefone,
        usu_email,
        usu_senha,
        per_nome,
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

      const permissao = await Permissoes.findOne({ where: { per_nome } });

      usuario.usu_nome = usu_nome;
      usuario.usu_genero = usu_genero;
      usuario.usu_telefone = usu_telefone;
      usuario.usu_email = usu_email;
      usuario.per_id = permissao.per_id;
      usuario.usu_campo_busca =
        usu_nome +
        " | " +
        usuario.usu_cpf +
        " | " +
        usu_telefone +
        " | " +
        usu_email;

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

    // #swagger.tags = ['Usuários]
    // #swagger.summary = 'Listar todos os usuários'
    // #swagger.description = 'Endpoint para listar todos os usuários cadastrados.'
    /* #swagger.responses[200] = { 
      description: 'Lista de todos os usuários cadastrados',
      schema: { $ref: "#/definitions/userFindAll200" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/userFindAll500" }
    } */

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

    // #swagger.tags = ['Usuários]
    // #swagger.summary = 'Remover um usuário'
    // #swagger.description = 'Endpoint para remover um usuário por meio de seu Id.'
    /* #swagger.parameters['usuarioId'] = {in: 'path', type: 'integer', description: 'ID do usuário a ser removido.'} */
    /* #swagger.parameters["body"] = { 
      in: "body",
      description: "Dados de confirmação para remover o usuário",
      type: "object",
      schema: {
        id: 2
      },
      required: true
    } */
    /* #swagger.responses[200] = { 
      description: 'Usuário removido com sucesso'
    } */
    /* #swagger.responses[400] = { 
      description: 'Requisição inválida, dados de remoção ausentes ou inválidos',
      schema: { $ref: "#/definitions/userRemove400" }
    } */
    /* #swagger.responses[401] = { 
      description: 'Operação não autorizada',
      schema: { $ref: "#/definitions/userRemove401" }
    } */
    /* #swagger.responses[404] = { 
      description: 'Usuário não encontrado',
      schema: { $ref: "#/definitions/userRemove404" }
    } */
    /* #swagger.responses[500] = { 
      description: 'Erro interno do servidor',
      schema: { $ref: "#/definitions/userRemove500" }
    } */

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
