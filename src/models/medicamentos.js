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
    med_nome: DataTypes.STRING,
    med_data: DataTypes.DATEONLY,
    med_hora: DataTypes.TIME,
    med_tipo: DataTypes.ENUM('Cápsula', 'Comprimido', 'Líquido', 'Creme', 'Gel', 'Inalação', 'Injeção', 'Spray'),
    med_descricao: DataTypes.STRING,
    med_qtd: DataTypes.DECIMAL,
    med_unidade: DataTypes.ENUM('mg', 'mcg', 'g', 'mL', '%'),
    med_observacoes: DataTypes.STRING,
    med_status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Exercicios',
  });
  return Exercicios;
};