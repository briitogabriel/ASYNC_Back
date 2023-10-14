"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Administrador",
        email: "admin@todoapp.com.br",
        password: "admin123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Usuario",
        email: "usuario@todoapp.com.br",
        password: "usuario123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
