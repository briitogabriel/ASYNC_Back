require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const server = express();

server.use(
  cors({
    origin: "*",
  })
);
server.use(express.json());

server.get("/", (request, response) => {
  response.status(200).send({message: `${process.env.APP_NAME} está no ar!`});
});

module.exports = {
  server,
};
