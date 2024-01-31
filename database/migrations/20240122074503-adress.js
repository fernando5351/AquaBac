'use strict';

const { ADRESS_TABLE, AdressModel } = require('../models/AddressModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ADRESS_TABLE, AdressModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ADRESS_TABLE);
  }
};
