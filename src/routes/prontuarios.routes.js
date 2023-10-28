const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { findAll } = require("../controllers/paciente.controller");

class ProntuariosRouter {
  routesFromProntuario() {
    const prontuarioRoutes = Router();
    prontuarioRoutes.get("/prontuarios", auth, findAll);
    return ProntuariosRouter;
  }
}

module.exports = new ProntuariosRouter();
