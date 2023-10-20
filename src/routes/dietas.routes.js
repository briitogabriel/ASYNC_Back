const { Router } = require('express');
const { create, findAllByPatient, update, remove, findAllAdmin } = require('../controllers/dieta.controller');
const { auth } = require('../middlewares/auth.middleware');

class DietaRouter{
    routesFromDietas() {
        const dietaRoutes = Router()
        dietaRoutes.post('/dietas', auth, create)
        dietaRoutes.get('/dietas', auth, findAllByPatient)
        dietaRoutes.put('/dietas/:dietaId', auth, update)
        dietaRoutes.delete('/dietas/:dietaId', auth, remove)
        dietaRoutes.get('/dietas/admin', auth, findAllAdmin)

        return dietaRoutes
    }
}

module.exports = new DietaRouter()