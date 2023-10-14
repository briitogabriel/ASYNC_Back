'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Consultas', {
      con_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      con_motivo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      con_data: {
        allowNull: false,
        type: Sequelize.DATE
      },
      con_hora: {
        allowNull: false,
        type: Sequelize.TIME
      },
      con_descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      con_medicacao: {
        type: Sequelize.STRING
      },
      con_dosagem_precaucoes: {
        allowNull: false,
        type: Sequelize.STRING
      },
      con_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      pac_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Pacientes',
          key: 'pac_id'
        }
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
    await queryInterface.dropTable('Consultas');
  }
};

// Motivo da consulta: String, Obrigatório, com máximo e mínimo de 64 e 8 caracteres, respectivamente.
// Data da Consulta: Obrigatório, buscando data atual do sistema e liberando para edição.
// Horário da Consulta: Obrigatório, buscando horário atual do sistema e liberando para edição.
// Descrição do Problema: String, Obrigatório, com máximo e mínimo de 1024 e 16 caracteres, respectivamente.
// Medicação Receitada: Indicador da medicação. Não é obrigatório.
// Dosagem e Precauções: String, Obrigatório, com máximo e mínimo de 256 e 16 caracteres, respectivamente.
// Status do Sistema: Obrigatório, tipo booleano.
