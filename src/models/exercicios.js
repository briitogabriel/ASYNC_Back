'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercicios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Pacientes)
    }
  }
  Exercicios.init({
    exe_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exe_nome: DataTypes.STRING,
    exe_data: DataTypes.DATEONLY,
    exe_hora: DataTypes.TIME,
    exe_tipo: DataTypes.STRING,
    exe_descricao: DataTypes.STRING,
    exe_qtd: DataTypes.DECIMAL,
    pac_id: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Exercicios',
    tableName: 'Exercicios',
    underscored: true
  });
  return Exercicios;
};