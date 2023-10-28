const { Router } = require('express');
const { findAll } = require("../controllers/estatisticas.controller");
const { auth } = require('../middlewares/auth.middleware');

class EstatisticasRouter{
    routesFromEstatisticas() {
        const estatisticasRoutes = Router()
        estatisticasRoutes.get('/estatisticas', auth, findAll)

        return estatisticasRoutes
    }
}

module.exports = new EstatisticasRouter()