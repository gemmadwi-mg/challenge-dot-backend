'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('UserGameBiodata', 'user_game_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserGameBiodata', 'user_game_id', Sequelize.INTEGER);
  }
};
