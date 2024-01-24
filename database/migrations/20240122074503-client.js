'use strict';

const { CLIENT_TABLE, ClientModel } = require('../models/ClientsModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CLIENT_TABLE, ClientModel);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CLIENT_TABLE);
  }
};
