'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complementos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Complementos.init({
    comp_numero: DataTypes.STRING,
    comp_complemento: DataTypes.STRING,
    comp_bairro: DataTypes.STRING,
    comp_ponto_referencia: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Complementos',
  });
  return Complementos;
};