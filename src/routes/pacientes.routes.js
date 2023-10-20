const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { create } = require("../controllers/paciente.controller");

class PacientesRouter {
  routesFromPaciente() {
    const pacienteRoutes = Router();
    pacienteRoutes.post("/pacientes", auth, create);

    return pacienteRoutes;
  }
}

module.exports = new PacientesRouter();
