const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { create, update, remove, findOne, findMedicamentosByUser, findAllByPatient } = require("../controllers/medicamento.controller");

class MedicamentosRouter{
    routesFromMedicamentos() {
        const medicamentoRoutes = Router()
        medicamentoRoutes.post('/medicamentos', auth, create)
        medicamentoRoutes.put('/medicamentos/:medicamentoId',auth, update)
        medicamentoRoutes.get('/medicamentos/:medicamentoId',auth, findOne)
        medicamentoRoutes.delete('/medicamentos/:medicamentoId',auth, remove)
        medicamentoRoutes.get('/pacientes/:pacienteId/medicamentos',auth, findAllByPatient)
        medicamentoRoutes.get('/medicamentos/',auth, findMedicamentosByUser)

        return medicamentoRoutes
    }
}

module.exports = new MedicamentosRouter()
