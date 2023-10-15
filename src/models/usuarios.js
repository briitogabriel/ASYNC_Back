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
      this.belongsTo(models.Pacientes, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Usuarios.init({
    usu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usu_nome: DataTypes.STRING,
    usu_genero: DataTypes.STRING,
    usu_cpf: DataTypes.STRING,
    usu_telefone: DataTypes.STRING,
    usu_email: DataTypes.STRING,
    usu_senha: DataTypes.STRING,
    // usu_tipo: DataTypes.STRING,  // TIPO É CRIADO PELA TABELA DE PERMISSÕES (per_id)
    usu_status: DataTypes.BOOLEAN,
    usu_campo_busca: DataTypes.STRING,
    per_id: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Usuarios',
    tableName: 'Usuarios',
    underscored: true
  });
  return Usuarios;
};