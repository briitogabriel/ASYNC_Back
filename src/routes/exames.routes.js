const { Router } = require('express');
// implementar a pacienteByExame ==> const { create, findAllByPatient, update, remove, findAllAdmin } = require('../controllers/exames.controller');
const { auth } = require('../middlewares/auth.middleware');

class ExamesRouter{
    routesFromExames() {
        const exameRoutes = Router()
        exameRoutes.post('/exames', auth, create)
        // implementar a rota de pacienteByExame ==> exameRoutes.get('/dietas', auth, findAllByPatient)
        exameRoutes.put('/exames/:exameId', auth, update)
        exameRoutes.delete('/exames/:exameId', auth, remove)
        exameRoutes.get('/exames/admin', auth, findAllAdmin)

        return exameRoutes
    }
}

module.exports = new ExamesRouter()