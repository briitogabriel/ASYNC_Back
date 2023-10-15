'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercicios', {
      exe_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exe_nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      exe_data: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      exe_hora: {
        allowNull: false,
        type: Sequelize.TIME
      },
      exe_tipo: {
        allowNull: false,
        type: Sequelize.ENUM('Resistência Aeróbica', 'Resistência Muscular', 'Flexibilidade', 'Força', 'Agilidade', 'Outro')
      },
      exe_descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      exe_qtd: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      exe_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('Exercicios');
  }
};

// Nome do Série de Exercícios: Obrigatório, com máximo e mínimo de 100 e 5 caracteres, respectivamente.
// Data: Obrigatório, buscando data atual do sistema e liberando para edição.
// Horário: Obrigatório, buscando horário atual do sistema e liberando para edição.
// Tipo: Obrigatório com dropdown de opções pré-definidas.
// Opções: Resistência Aeróbica, Resistência Muscular, Flexibilidade, Força, Agilidade, Outro.
// Quantidade por Semana: Obrigatório, do tipo numérico com no mínimo duas casas após a vírgula.
// Descrição: Obrigatório, com máximo e mínimo de 1000 e 10 caracteres, respectivamente.
// Status do Sistema: Obrigatório, apenas leitura, tipo booleano, iniciar sempre como ‘ativo’.

