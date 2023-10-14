'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      usu_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usu_nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      usu_genero: {
        allowNull: false,
        type: Sequelize.ENUM('M', 'F')
      },
      usu_cpf: {
        allowNull: false,
        type: Sequelize.STRING
      },
      usu_telefone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      usu_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      usu_senha: {
        allowNull: false,
        type: Sequelize.STRING
      },
      usu_tipo: {
        allowNull: false,
        type: Sequelize.ENUM('Médico', 'Administrador', 'Enfermeiro')
      },
      usu_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      usu_campo_busca: {    // IRÁ CONCATENAR OS CAMPOS PARA CRIAR UMA STRING E FACILITAR AS QUERIES DE BUSCA
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
      per_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Permissoes',
          key: 'per_id'
        }
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};

// Nome completo: Obrigatório, com máximo e mínimo de 64 e 8 caracteres, respectivamente.
// Gênero: Obrigatório com dropdown de opções pré-definidas.
// CPF: Obrigatório com o formato 000.000.000-00
// Telefone: Obrigatório com o formato (99) 9 9999-99999
// E-mail: Obrigatório e com validação.
// Senha: Obrigatório, com mínimo de 6 caracteres.
// Tipo: Obrigatório com dropdown de opções com: Médico, Administrador e Enfermeiro.
// Status do Sistema: Obrigatório, apenas leitura, tipo booleano, iniciar sempre como ‘ativo’.
