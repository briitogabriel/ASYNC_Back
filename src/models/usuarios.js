'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Permissoes)
    }
  }
  Usuarios.init({
    usu_nome: DataTypes.STRING,
    usu_genero: DataTypes.ENUM('M', 'F'),
    usu_cpf: DataTypes.STRING,
    usu_telefone: DataTypes.STRING,
    usu_email: DataTypes.STRING,
    usu_senha: DataTypes.STRING,
    usu_tipo: DataTypes.ENUM('Médico', 'Administrador', 'Enfermeiro'),
    usu_status: DataTypes.BOOLEAN,
    usu_campo_busca: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};