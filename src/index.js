require("dotenv").config();
const PORT = process.env.APP_PORT;
const { server } = require("./server");
const { Sequelize } = require("sequelize");
const DB_CONFIG = require("./config/database");

const sequelize = new Sequelize(DB_CONFIG);
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco de dados bem sucedida");
  } catch (err) {
    console.log("Sem conexão com banco de dados", err);
  }
};

connect();

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
