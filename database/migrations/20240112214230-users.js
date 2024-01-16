'use strict';

const {USER_TABLE,UserModel} = require('../models/UserModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserModel);

    await queryInterface.bulkInsert(USER_TABLE, [{
      name: 'Josue',
      lastname: 'Diaz',
      email: 'josuejonathandiaz309@gmail.com',
      password: '!suQKUN%y*Gw?wsVvJxmYpH$D2PvDe',
      dui: '067406194',
      direction: 'Colonia Guadalupe San julian',
      status: true,
      id_role: 1,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    }]);

  },

  async down (queryInterface) {
   queryInterface.dropTable(USER_TABLE)
  }
};
