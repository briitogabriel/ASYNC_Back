const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { create, update, findAll, findOne } = require("../controllers/paciente.controller");

class PacientesRouter {
  routesFromPaciente() {
    const pacienteRoutes = Router();
    pacienteRoutes.post("/pacientes", auth, create);
    pacienteRoutes.put("/pacientes/:pacienteId", auth, update);
    pacienteRoutes.get("/pacientes", auth, findAll);
    pacienteRoutes.get("/pacientes/:pacienteId", auth, findOne);

    return pacienteRoutes;
  }
}

module.exports = new PacientesRouter();
