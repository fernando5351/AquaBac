'use strict';

const { CLIENT_TABLE, ClientModel } = require('../models/ClientsModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CLIENT_TABLE, ClientModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CLIENT_TABLE);
  }
};
