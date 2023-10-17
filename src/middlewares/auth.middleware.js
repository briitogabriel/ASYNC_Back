require('dotenv').config();
const jwt  = require('jsonwebtoken');

async function auth(req, res, next) {
    try {
        const { authorization } = req.headers;
        
        if (!authorization) {
            return res.status(401).send({
                message: "É necessário gerar um token para acessar o recurso.",
                data: null,
                success: false
            });
        };

        jwt.verify(authorization.replace('Bearer ', ''), 
            process.env.APP_SECRET,
            next()
        );
    } catch (error) {
        return res.status(401).send({
            message: "Falha na autenticação do usuário.",
            cause: error.message
        });
    }
}

module.exports = { auth };