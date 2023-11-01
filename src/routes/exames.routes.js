const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { create, update, remove, findAllAdmin, findOne, findAllByPatient } = require("../controllers/exames.controller");

class ExamesRouter{
    routesFromExames() {
        const exameRoutes = Router()
        exameRoutes.post('/exames', auth, create)
        exameRoutes.put('/exames/:exameId',auth, update)
        exameRoutes.get('/exames/:exameId',auth, findOne)
        exameRoutes.delete('/exames/:exameId',auth, remove)
        exameRoutes.get('/exames',auth, findAllAdmin)
        exameRoutes.get('/pacientes/:pacienteId/exames',auth, findAllByPatient)

        return exameRoutes
    }
}

module.exports = new ExamesRouter()