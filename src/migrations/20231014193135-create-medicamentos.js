'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicamentos', {
      med_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      med_nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      med_data: {
        allowNull: false,
        type: Sequelize.DATE
      },
      med_hora: {
        allowNull: false,
        type: Sequelize.TIME
      },
      med_tipo: {
        allowNull: false,
        type: Sequelize.ENUM('Cápsula', 'Comprimido', 'Líquido', 'Creme', 'Gel', 'Inalação', 'Injeção', 'Spray')
      },
      med_descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      med_qtd: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      med_unidade: {
        allowNull: false,
        type: Sequelize.ENUM('mg', 'mcg', 'g', 'mL', '%')
      },
      med_observacoes: {
        allowNull: false,
        type: Sequelize.STRING
      },
      med_status: {
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
    await queryInterface.dropTable('Medicamentos');
  }
};

// Nome do Medicamento: Obrigatório, com máximo e mínimo de 100 e 5 caracteres, respectivamente.
// Data: Obrigatório, buscando data atual do sistema e liberando para edição.
// Horário: Obrigatório, buscando horário atual do sistema e liberando para edição.
// Tipo: Obrigatório com dropdown de opções pré-definidas.
// Opções: Cápsula, Comprimido, Líquido, Creme, Gel, Inalação, Injeção ou Spray.
// Quantidade: Obrigatório, do tipo numérico com no mínimo duas casas após a vírgula.
// Unidade: Obrigatório com dropdown de opções pré-definidas.
// Opções: mg, mcg, g, mL e %
// Observações: Obrigatório, com máximo e mínimo de 1000 e 10 caracteres, respectivamente.
// Status do Sistema: Obrigatório, tipo booleano.
