const { Router } = require('express');
const { login } = require('../controllers/usuario.controller');

class UsuariosRouter {
    routesFromUsuario() {
        const usuarioRoutes = Router()
        usuarioRoutes.post('/usuarios/login', login)
        /* 
        usuarioRoutes.patch('/usuarios/resetarsenha/:usuarioId', resetarSenha)
        usuarioRoutes.post('/usuarios', create)
        usuarioRoutes.put('/usuarios/:usuarioId', update)
        usuarioRoutes.get('/usuarios', findAll)
        usuarioRoutes.delete('/usuarios/:usuarioId', remove) */

        return usuarioRoutes
    };
};

module.exports = new UsuariosRouter();