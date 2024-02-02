'use strict';

const { Amount_TABLE, AmountModel } = require('../models/amountModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(Amount_TABLE, AmountModel);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(Amount_TABLE);
  }
};
