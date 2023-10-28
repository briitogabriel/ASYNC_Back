'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pacientes', {
      pac_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pac_nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pac_genero: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pac_nascimento: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      pac_cpf: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pac_rg: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pac_estado_civil: {
        allowNull: false,
        type: Sequelize.ENUM('Solteiro/a', 'Casado/a', 'Divorciado/a', 'Viúvo/a')
      },
      pac_telefone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pac_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pac_naturalidade: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pac_contato_emergencia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pac_alergias: {
        type: Sequelize.STRING
      },
      pac_cuidados_especiais: {
        type: Sequelize.STRING
      },
      pac_convenio: {
        type: Sequelize.STRING
      },
      pac_numero_convenio: {
        type: Sequelize.STRING
      },
      pac_validade_convenio: {
        type: Sequelize.DATEONLY
      },
      end_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Enderecos',
          key: 'end_id'
        }
      },
      comp_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Complementos',
          key: 'comp_id'
        }
      },
      pac_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      usu_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'usu_id'
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
    await queryInterface.dropTable('Pacientes');
  }
};

// Nome Completo: String, Obrigatório, com máximo e mínimo de 64 e 8 caracteres, respectivamente.
// Gênero: String, obrigatório
// Data de Nascimento: Obrigatório, data válida.
// CPF: String, Obrigatório com o formato 000.000.000-00
// RG com órgão expedidor: Obrigatório, com máximo de 20 caracteres.
// Estado Civil: Obrigatório com dropdown de opções pré-definidas.
// Telefone: String, Obrigatório com o formato (99) 9 9999-99999
// E-mail: String, obrigatório e com validação.
// Naturalidade: String, Obrigatório, com máximo e mínimo de 64 e 8 caracteres, respectivamente.
// Contato de Emergência: String, Obrigatório com o formato (99) 9 9999-99999
// Lista de Alergias: String, Não obrigatório.
// Lista de Cuidados Específicos: String, Não obrigatório.
// Convênio: String, Não obrigatório.
// Número do Convênio: String, Não obrigatório.
// Validade do Convênio: String, Data válida, Não obrigatório.
// Endereço: Objeto do tipo endereço, Cep, Cidade, Estado, Logradouro, Número, Complemento, Bairro e Ponto de Referência. Obrigatório.
//     - O Endereço deve ser armazenado em uma tabela aparte
// Status do Sistema: Obrigatório, apenas leitura, tipo booleano, iniciar sempre como ‘ativo’.
