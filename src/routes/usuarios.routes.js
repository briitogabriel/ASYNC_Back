const { Router } = require("express");
const { login, create, resetarSenha, update, findAll, remove } = require("../controllers/usuario.controller");
const { auth } = require("../middlewares/auth.middleware");

class UsuariosRouter {
  routesFromUsuario() {
    const usuarioRoutes = Router();
    usuarioRoutes.post("/usuarios/login", login);
    usuarioRoutes.post("/usuarios", auth, create);
    usuarioRoutes.patch('/usuarios/resetar-senha', auth, resetarSenha);
    usuarioRoutes.put('/usuarios/:usuarioId', auth, update);
    usuarioRoutes.get('/usuarios', auth, findAll);
    usuarioRoutes.delete('/usuarios/:usuarioId', auth, remove)
    
    return usuarioRoutes;
  }
}

module.exports = new UsuariosRouter();
