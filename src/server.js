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
  response.status(200).json({
    message: `Hello, ${process.env.APP_NAME}!`,
  });
});

server.post("/auth", (request, response) => {
  const { body } = request;

  const emptyData = !body?.email || !body?.password;

  if (emptyData) {
    return response.status(400).json({
      message: "Os dados do formulario são obrigatorios",
      data: null,
      success: false,
    });
  }

  const user = users.find((item) => item.email === body.email);

  if (!user) {
    return response.status(404).json({
      message: `Não foi possivel fazer autenticação`,
      data: null,
      success: false,
    });
  }

  const isPasswordValid = user.password === body.password;

  const token =
    isPasswordValid &&
    jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.APP_SECRET,
      {
        expiresIn: "1h",
      }
    );

  return response.status(!isPasswordValid ? 401 : 200).json({
    message: isPasswordValid
      ? `Usuário ${user.email} autenticado com sucesso.`
      : `Usuário e/ou senha invalidos`,
    success: isPasswordValid,
    data: isPasswordValid ? token : null,
  });
});

server.get("/todos", (request, response) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      data: null,
      message: "E necessario gerar um token para acessar o recurso",
      success: false,
    });
  }

  jwt.verify(
    authorization.replace("Bearer ", ""),
    process.env.APP_SECRET,
    (err) => {
      return err
        ? response.status(500).json({
            success: false,
            message: "Token invalido",
            data: null,
          })
        : response.status(200).json({
            message: `Foram encontrados ${todos.length} tarafas`,
            data: todos,
            success: true,
          });
    }
  );
});

module.exports = {
  server,
};
