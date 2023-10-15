'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enderecos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Usuarios, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Enderecos.init({
    end_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    end_cep: DataTypes.STRING,
    end_cidade: DataTypes.STRING,
    end_estado: DataTypes.STRING,
    end_logradouro: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Enderecos',
    tableName: 'Enderecos',
    underscored: true
  });
  return Enderecos;
};