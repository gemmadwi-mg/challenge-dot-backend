'use strict';
const userGameHistory = require('../masterdata/usergamehistory.json')

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = userGameHistory.map((each) => {
      return {
        skor: each.skor,
        user_game_id: each.user_game_id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('UserGameHistories', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserGameHistories', null, {});
  }
};
