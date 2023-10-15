'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultas extends Model {
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
  Consultas.init({
    con_motivo: DataTypes.STRING,
    con_data: DataTypes.DATEONLY,
    con_hora: DataTypes.TIME,
    con_descricao: DataTypes.STRING,
    con_medicacao: DataTypes.STRING,
    con_dosagem_precaucoes: DataTypes.STRING,
    con_status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Consultas',
  });
  return Consultas;
};