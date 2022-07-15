'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameBiodata.belongsTo(models.UserGame, { 
        foreignKey: 'user_game_id'
      });
    }
  }
  UserGameBiodata.init({
    user_game_biodata_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usia: DataTypes.INTEGER,
    user_game_id: { 
      type: DataTypes.INTEGER,
      references: { 
        model: 'UserGame',
        key: 'user_game_id'
      }
    },
  }, {
    sequelize,
    modelName: 'UserGameBiodata',
  });
  return UserGameBiodata;
};