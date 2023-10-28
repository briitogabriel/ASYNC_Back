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
            (error, decoded) => {
                if (error) {
                   if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        message: "Token expirado."
                    });
                    } else if (error.name === "JsonWebTokenError") {
                        return res.status(401).json({
                            message: "Token inválido."
                        });
                    } else {
                        return res.status(500).json({
                            message: "Internal server error"
                        });
                    }
                } else {
                    req.body.id = decoded.id
                    return next()
                };
            }
        );
    } catch (error) {
        return res.status(401).send({
            message: "Falha na autenticação do usuário.",
            cause: error.message
        });
    }
}

module.exports = { auth };