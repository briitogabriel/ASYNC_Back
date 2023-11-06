const { Router } = require('express');
const { auth } = require('../../middlewares/auth.middleware');
const { create, update, remove, findAllAdmin, findOne, findExamesByUser, findAllByPatient } = require("../../controllers/exames.controller");

class ExamesRouter{
    routesFromExames() {
        const exameRoutes = Router()
        exameRoutes.post('/exames', auth, create)
        exameRoutes.put('/exames/:exameId',auth, update)
        exameRoutes.get('/exames/:exameId',auth, findOne)
        exameRoutes.delete('/exames/:exameId',auth, remove)
        exameRoutes.get('/pacientes/:pacienteId/exames',auth, findAllByPatient)
        exameRoutes.get('/exames/admin',auth, findAllAdmin)
        exameRoutes.get('/exames/',auth, findExamesByUser)

        return exameRoutes
    }
}

module.exports = new ExamesRouter()
