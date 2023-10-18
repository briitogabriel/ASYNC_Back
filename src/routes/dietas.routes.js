const { Router } = require('express');
const { create } = require('../controllers/dieta.controller');
const { auth } = require('../middlewares/auth.middleware');

class DietaRouter{
    routesFromDietas() {
        const dietaRoutes = Router()
        dietaRoutes.get('/', (request, response) => {
            response.status(200).send({message: `${process.env.APP_NAME} está no ar!`});
            });
        dietaRoutes.post('/dietas', auth, create)

        return dietaRoutes
    }
}

module.exports = new DietaRouter()