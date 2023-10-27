const { Router } = require('express');
const { create } = require('../controllers/exercicio.controller');
const { auth } = require('../middlewares/auth.middleware');

class ExercicioRouter{
    routesFromExercicios() {
        const exercicioRoutes = Router()
        exercicioRoutes.post('/exercicios', /*auth,*/ create)

        return exercicioRoutes
    }
}

module.exports = new ExercicioRouter()