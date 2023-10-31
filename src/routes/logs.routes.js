const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { listarLogs } = require('../controllers/logs.controller');

class LogsRouter{
    routesFromLogs() {
        const logRoutes = Router()

        logRoutes.get('/logs', auth, listarLogs)

        return logRoutes
    }
}

module.exports = new LogsRouter()