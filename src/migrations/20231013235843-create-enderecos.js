'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enderecos', {
      end_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      end_cep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      end_cidade: {
        allowNull: false,
        type: Sequelize.STRING
      },
      end_estado: {
        allowNull: false,
        type: Sequelize.STRING
      },
      end_logradouro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      end_numero: {
        allowNull: false,
        type: Sequelize.STRING
      },
      end_complemento: {
        allowNull: false,
        type: Sequelize.STRING
      },
      end_bairro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      end_ponto_referencia: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Enderecos');
  }
};

// Endereço: Objeto do tipo endereço, Cep, Cidade, Estado, Logradouro, Número, Complemento, Bairro e Ponto de Referência. Obrigatório.