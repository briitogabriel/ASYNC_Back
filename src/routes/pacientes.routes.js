const { Router } = require('express');
const { findAllPaciente } = require('../controllers/paciente.controller');

class PacienteRouter{
    routesFromPacientes() {
        const pacienteRoutes = Router()
        pacienteRoutes.get('/pacientes', findAllPaciente)

        return pacienteRoutes
    }
}

module.exports = new PacienteRouter()