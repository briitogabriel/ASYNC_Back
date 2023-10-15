'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dietas extends Model {
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
  Dietas.init({
    die_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    die_nome: DataTypes.STRING,
    die_data: DataTypes.DATE,
    die_hora: DataTypes.TIME,
    die_tipo: DataTypes.STRING,
    die_descricao: DataTypes.STRING,
    pac_id: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Dietas',
    tableName: 'Dietas',
    underscored: true
  });
  return Dietas;
};