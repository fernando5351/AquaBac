'use strict';

const { Amount_TABLE, AmountModel } = require('../models/amountModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(Amount_TABLE, AmountModel);

    await queryInterface.bulkInsert(Amount_TABLE, [
      {
        name: "cuota mensual",
        amount: 10.50,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: "mora",
        amount: 1.50,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(Amount_TABLE);
  }
};
