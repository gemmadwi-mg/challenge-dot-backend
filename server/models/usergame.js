'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGame.hasMany(models.UserGameHistory, {
        foreignKey: 'user_game_id'
      });

      UserGame.hasMany(models.UserGameBiodata, {
        foreignKey: 'user_game_id'
      });
    }
  }
  UserGame.init({
    user_game_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isLowercase: true
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'user'
    },
  }, {
    sequelize,
    modelName: 'UserGame',
    hooks: {
      beforeCreate: (userGame, options) => {
        userGame.password = bcrypt.hashSync(userGame.password, +process.env.SALT_ROUNDS);
        return userGame;
      }
    }
  });
  return UserGame;
};