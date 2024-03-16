'use strict';

const { MONTHLYFEES_TABLE, MonthlyFeesModel } = require('../models/MonthlyFeesModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(MONTHLYFEES_TABLE, MonthlyFeesModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(MONTHLYFEES_TABLE);
  }
};
