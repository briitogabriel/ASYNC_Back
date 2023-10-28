const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');

class LogsRouter{
    routesFromLogs() {
        const logRoutes = Router()
        logRoutes.get('/logs', auth, findAllAdmin)

        return logRoutes
    }
}

module.exports = new LogsRouter()