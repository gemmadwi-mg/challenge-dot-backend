'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameHistory.belongsTo(models.UserGame, { 
        foreignKey: 'user_game_id'
      });
      // models.UserGame.hasMany(UserGameHistory);
    }
  }
  UserGameHistory.init({
    user_game_history_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    skor: DataTypes.INTEGER,
    user_game_id: { 
      type: DataTypes.INTEGER,
      references: { 
        model: 'UserGame',
        key: 'user_game_id'
      }
    },
  }, {
    sequelize,
    modelName: 'UserGameHistory',
  });
  return UserGameHistory;
};