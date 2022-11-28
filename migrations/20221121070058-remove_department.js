'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'department_id');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'department_id');
  }
};
