'use strict';
const userGame = require('../masterdata/usergame.json')
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    const dataUserGame = userGame.map((each) => {
      return {
        username: each.username,
        password: bcrypt.hashSync(each.password, +process.env.SALT_ROUNDS),
        email: each.email,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('UserGames', dataUserGame, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserGames', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
