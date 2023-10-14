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
    exe_nome: DataTypes.STRING,
    exe_data: DataTypes.DATE,
    exe_hora: DataTypes.TIME,
    exe_tipo: DataTypes.ENUM('Resistência Aeróbica', 'Resistência Muscular', 'Flexibilidade', 'Força', 'Agilidade', 'Outro'),
    exe_descricao: DataTypes.STRING,
    exe_qtd: DataTypes.DECIMAL,
    exe_status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Exercicios',
  });
  return Exercicios;
};