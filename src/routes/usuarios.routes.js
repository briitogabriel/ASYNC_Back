const { Router } = require("express");
const { login, create } = require("../controllers/usuario.controller");
const { auth } = require("../middlewares/auth.middleware");

class UsuariosRouter {
  routesFromUsuario() {
    const usuarioRoutes = Router();
    usuarioRoutes.post("/usuarios/login", login);
    usuarioRoutes.post("/usuarios", auth, create);
    /* 
        usuarioRoutes.patch('/usuarios/resetarsenha/:usuarioId', resetarSenha)
        
        usuarioRoutes.put('/usuarios/:usuarioId', update)
        usuarioRoutes.get('/usuarios', findAll)
        usuarioRoutes.delete('/usuarios/:usuarioId', remove) */

    return usuarioRoutes;
  }
}

module.exports = new UsuariosRouter();
