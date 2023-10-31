const { Router } = require('express');
const { create, findAll } = require('../controllers/consultas.controller');
const { auth } = require('../middlewares/auth.middleware');

class ConsultasRouter{
  routesFromConsultas(){
    const consultaRoutes = Router()
    consultaRoutes.post('/consultas', auth, create)
    consultaRoutes.get("/consultas", auth, findAll);

    return consultaRoutes
  }

}

module.exports = new ConsultasRouter();