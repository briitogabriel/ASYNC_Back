const { Router } = require('express');
const { create, update, findAllAdmin, findOne, findAllByPatient, remove } = require('../../controllers/consultas.controller');
const { auth } = require('../../middlewares/auth.middleware');

class ConsultasRouter{
  routesFromConsultas(){
    const consultaRoutes = Router()
    consultaRoutes.post('/consultas', auth, create)
    consultaRoutes.put('/consultas/:consultaId', auth, update)
    consultaRoutes.get('/consultas/:consultaId', auth, findOne)
    consultaRoutes.get('/consultas/', auth, findAllAdmin)
    consultaRoutes.get('/pacientes/:pacienteId/consultas', auth, findAllByPatient)
    consultaRoutes.delete('/consultas/:consultaId', auth, remove)

    return consultaRoutes
  }

}

module.exports = new ConsultasRouter();