const { Router } = require("express");
const { auth } = require("../../middlewares/auth.middleware");
const { findAll } = require("../../controllers/prontuarios.controller");

class ProntuariosRouter {
  routesFromProntuario() {
    const prontuarioRoutes = Router();
    prontuarioRoutes.get("/prontuarios", auth, findAll);
    return prontuarioRoutes;
  }
}

module.exports = new ProntuariosRouter();
