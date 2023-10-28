'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exames extends Model {
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
  Exames.init({
    exa_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exa_nome: DataTypes.STRING,
    exa_data: DataTypes.DATEONLY,
    exa_hora: DataTypes.TIME,
    exa_tipo: DataTypes.STRING,
    exa_laboratorio: DataTypes.STRING,
    exa_url_documento: DataTypes.STRING,
    exa_resultados: DataTypes.STRING,
    pac_id: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Exames',
    tableName: 'Exames',
    underscored: true
  });
  return Exames;
};