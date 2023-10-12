const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    return res.status(200).send({message: "Funcionando!"})
});

module.exports = { server };