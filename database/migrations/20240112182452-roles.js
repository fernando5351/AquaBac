'use strict';

const {ROLE_TABLE,RoleModel} = require('../models/RoleModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable(ROLE_TABLE,RoleModel);

   await queryInterface.bulkInsert(ROLE_TABLE,[
    {
      name:'Gerente',
      status: true
    },
    {
      name: 'Empleado',
      status: true
    }
   ])
  },

  async down (queryInterface) {
      await queryInterface.dropTable(ROLE_TABLE);
  }
};
