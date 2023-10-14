'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Permissoes.init({
    per_nome: DataTypes.STRING,
    per_recursos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permissoes',
  });
  return Permissoes;
};