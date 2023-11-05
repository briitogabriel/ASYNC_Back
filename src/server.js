require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { Sequelize } = require("sequelize");
const DB_CONFIG = require("./config/database");
const sequelize = new Sequelize(DB_CONFIG);

const routes = require('./routes')

class Server {
  constructor ( server = express())
  {
    this.middlewares(server)
    this.database()
    this.allRoutes(server)
    this.initializeServer(server)
  }

  async middlewares(app) {
    app.use(
      cors({
        origin: "*",
      })
    );
    app.use(express.json());
  }

  async database(){
    try {
      await sequelize.authenticate();
      console.log("Conexão com banco de dados bem sucedida");
    } catch (err) {
      console.log("Sem conexão com banco de dados", err);
    }
  }
  
    async allRoutes(app) {
      app.use(routes)
    }

  async initializeServer(app){
    const PORT = process.env.APP_PORT
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
  }
}

module.exports = { Server }