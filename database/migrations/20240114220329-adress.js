'use strict';

const { ADRESS_TABLE, AdressModel } = require('../models/AddressModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ADRESS_TABLE, AdressModel);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ADRESS_TABLE);
  }
};
