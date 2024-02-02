'use strict';

const { PAYMENT_TABLE, PaymentModel } = require('../models/PaymentModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PAYMENT_TABLE, PaymentModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PAYMENT_TABLE);
  }
};
