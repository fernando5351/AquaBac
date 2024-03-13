'use strict';

const { AMOUNTS_TABLE, AmountsModel } = require('../models/amounts.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(AMOUNTS_TABLE, AmountsModel)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(AMOUNTS_TABLE);
  }
};
