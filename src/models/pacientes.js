'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pacientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuarios)
      this.belongsTo(models.Enderecos)
      this.belongsTo(models.Complementos)
    }
  }
  Pacientes.init({
    pac_nome: DataTypes.STRING,
    pac_genero: DataTypes.STRING,
    pac_nascimento: DataTypes.DATE,
    pac_cpf: DataTypes.STRING,
    pac_rg: DataTypes.STRING,
    pac_estado_civil: DataTypes.ENUM('Solteiro/a', 'Casado/a', 'Divorciado/a', 'Viúvo/a'),
    pac_telefone: DataTypes.STRING,
    pac_email: DataTypes.STRING,
    pac_naturalidade: DataTypes.STRING,
    pac_contato_emergenciA: DataTypes.STRING,
    pac_alergias: DataTypes.STRING,
    pac_cuidados_especiaiS: DataTypes.STRING,
    pac_convenio: DataTypes.STRING,
    pac_numero_convenio: DataTypes.STRING,
    pac_validade_convenio: DataTypes.DATE,
    pac_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pacientes',
  });
  return Pacientes;
};