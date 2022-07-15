'use strict';
const userGameBiodata = require('../masterdata/usergamebiodata.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = userGameBiodata.map((each) => {
      return {
        usia: each.usia,
        user_game_id: each.user_game_id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('UserGameBiodata', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserGameBiodata', null, {});
  }
};
