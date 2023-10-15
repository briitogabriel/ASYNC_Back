// const { create, findAll, findOne, login, findCarts, update, updatePassword } = require('../controllers/user.controller')
const { Router } = require('express');
const { create } = require('../controllers/dieta.controller');
// const { auth } = require('../middlewares/auth.middleware')

class DietaRouter{
    routesFromDietas() {
        const dietaRoutes = Router()
        dietaRoutes.get('/', (request, response) => {
            response.status(200).send({message: `${process.env.APP_NAME} está no ar!`});
            });
        dietaRoutes.post('/dietas', create)
        // dietaRoutes.get('/users', auth , findAll)
        // dietaRoutes.get('/users/:userId', auth, findOne)
        // dietaRoutes.patch('/users/:userId', auth, update)
        // dietaRoutes.patch('/users/:userId/change-password', auth, updatePassword)
        // dietaRoutes.post('/users/login', login)
        // dietaRoutes.get('/users/:userId/carts', findCarts)

        return dietaRoutes
    }
}

module.exports = new DietaRouter()