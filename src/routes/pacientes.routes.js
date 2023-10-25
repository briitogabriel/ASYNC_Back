const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { create, update } = require("../controllers/paciente.controller");

class PacientesRouter {
  routesFromPaciente() {
    const pacienteRoutes = Router();
    pacienteRoutes.post("/pacientes", auth, create);
    pacienteRoutes.put("/pacientes/:pacienteId", auth, update);

    return pacienteRoutes;
  }
}

module.exports = new PacientesRouter();
