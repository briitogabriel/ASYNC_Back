require("dotenv").config();
const { server } = require("./server");
const PORT = process.env.APP_PORT;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
