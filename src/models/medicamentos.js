'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicamentos extends Model {
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
  Medicamentos.init({
    med_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    med_nome: DataTypes.STRING,
    med_data: DataTypes.DATEONLY,
    med_hora: DataTypes.TIME,
    med_tipo: DataTypes.STRING,
    med_descricao: DataTypes.STRING,
    med_qtd: DataTypes.DECIMAL,
    med_unidade: DataTypes.STRING,
    med_observacoes: DataTypes.STRING,
    pac_id: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Medicamentos',
    tableName: 'Medicamentos',
    underscored: true
  });
  return Medicamentos;
};