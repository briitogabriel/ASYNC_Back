require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../config/database");
const sequelize = new Sequelize(DB_CONFIG);
const Usuarios = require('../models/usuarios')(sequelize, Sequelize);

class UsuarioController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).send({
                    message: "Os dados são obrigatórios.",
                    data: null,
                    success: false
                });
            };

            const usuario = await Usuarios.findOne({
                where: {usu_email:email}
            });

            if (!usuario) {
                return res.status(400).send({
                    message: "Não foi possível realizar a autenticação. Usuário não cadastrado.",
                    data: null,
                    success: false
                });
            };

            const isPasswordValid = usuario.usu_senha === senha;

            const token = isPasswordValid && jwt.sign(
                {
                    id: usuario.usu_id,
                    name: usuario.usu_nome,
                    email: usuario.usu_email
                },
                process.env.APP_SECRET,
                {
                    expiresIn: 3600
                }
            );

            if (!isPasswordValid) {
                return res.status(401).send({
                    message: 'Usuário e/ou senha inválidos.'
                });
            };

            return res.status(200).send({
                message: `Usuário ${usuario.usu_nome} autenticado com sucesso.`,
                data: isPasswordValid ? token : null,
                success: isPasswordValid
            });

        } catch (error) {
            return res.status(400).send({
                message: "Erro ao realizar o login do usuário.",
                cause: error.message
            })
        }
    }
};

module.exports = new UsuarioController();