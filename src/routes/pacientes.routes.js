const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");

class PacientesRouter {
  routesFromPaciente() {
    const pacienteRoutes = Router();
    
    return pacienteRoutes;
  }
}

module.exports = new PacientesRouter();
