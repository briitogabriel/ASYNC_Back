const { Router } = require('express');
const { create, findAllByPatient, update, remove, findAllAdmin } = require('../../controllers/exercicio.controller');
const { auth } = require('../../middlewares/auth.middleware');

class ExercicioRouter{
    routesFromExercicios() {
        const exercicioRoutes = Router()
        exercicioRoutes.post('/exercicios', auth, create)
        exercicioRoutes.get('/exercicios/:pac_nome', auth, findAllByPatient)
        exercicioRoutes.put('/exercicios/:exercicioId', auth, update)
        exercicioRoutes.delete('/exercicios/:exercicioId', auth, remove)
        exercicioRoutes.get('/exercicios/admin', auth, findAllAdmin)

        return exercicioRoutes
    }
}

module.exports = new ExercicioRouter()