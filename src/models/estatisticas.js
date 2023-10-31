'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estatisticas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estatisticas.init({
    estatisticas_id: {
      pacientesCount: DataTypes.INTEGER,
      consultasCount: DataTypes.INTEGER,
      examesCount: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    log_descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estatisticas',
    tableName: 'Estatisticas',
    underscored: true
  });
  return Estatisticas;
};