'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exames', {
      exa_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exa_nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      exa_data: {
        allowNull: false,
        type: Sequelize.DATE
      },
      exa_hora: {
        allowNull: false,
        type: Sequelize.TIME
      },
      exa_tipo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      exa_laboratorio: {
        type: Sequelize.STRING
      },
      exa_url_documento: {
        type: Sequelize.STRING
      },
      exa_resultados: {
        allowNull: false,
        type: Sequelize.STRING
      },
      exa_status: {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exames');
  }
};

// Nome do Exame: Obrigatório, com máximo e mínimo de 64 e 8 caracteres, respectivamente.
// Data do Exame: Obrigatório, buscando horário atual do sistema e liberando para edição.
// Horário do Exame: Obrigatório, buscando horário atual do sistema e liberando para edição.
// Tipo do Exame: Obrigatório, com máximo e mínimo de 32 e 4 caracteres, respectivamente.
// Laboratório: Obrigatório, com máximo e mínimo de 32 e 4 caracteres, respectivamente.
// URL do Documento: Não obrigatório.
// Opcional: Você pode implementar uma opção para upload de arquivo do tipo pdf.
// Resultados: Obrigatório, com máximo e mínimo de 1024 e 16 caracteres, respectivamente.
// Status do Sistema: Obrigatório, tipo booleano.
