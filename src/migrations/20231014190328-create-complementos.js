'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Complementos', { 
      comp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      comp_numero: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comp_complemento: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comp_bairro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comp_ponto_referencia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      } 
      });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Complementos');
  }
};
