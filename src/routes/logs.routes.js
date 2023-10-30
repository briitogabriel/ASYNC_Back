const { Router } = require('express');
const { findAll } = require("../controllers/logs.controller");
const { auth } = require('../middlewares/auth.middleware');

class LogsRouter{
    routesFromLogs() {
        const logRoutes = Router()
        logRoutes.get('/logs', auth, findAll)

        return logRoutes
    }
}

module.exports = new LogsRouter()