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
      this.belongsTo(models.Usuarios, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      })
      this.belongsTo(models.Enderecos)
      this.belongsTo(models.Complementos)
      this.hasMany(models.Consultas, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      })
      this.hasMany(models.Exames, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      })
      this.hasMany(models.Dietas, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      })
      this.hasMany(models.Exercicios, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      })
      this.hasMany(models.Medicamentos, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Pacientes.init({
    pac_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pac_nome: DataTypes.STRING,
    pac_genero: DataTypes.STRING,
    pac_nascimento: DataTypes.DATEONLY,
    pac_cpf: DataTypes.STRING,
    pac_rg: DataTypes.STRING,
    pac_estado_civil: DataTypes.STRING,
    pac_telefone: DataTypes.STRING,
    pac_email: DataTypes.STRING,
    pac_naturalidade: DataTypes.STRING,
    pac_contato_emergencia: DataTypes.STRING,
    pac_alergias: DataTypes.STRING,
    pac_cuidados_especiais: DataTypes.STRING,
    pac_convenio: DataTypes.STRING,
    pac_numero_convenio: DataTypes.STRING,
    pac_validade_convenio: DataTypes.DATEONLY,
    end_id: DataTypes.INTEGER,
    comp_id: DataTypes.INTEGER,
    usu_id: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Pacientes',
    tableName: 'Pacientes',
    underscored: true
  });
  return Pacientes;
};