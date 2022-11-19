'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([queryInterface.renameColumn('users', 'gender', 'lastname')]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.renameColumn('users', 'lastname', 'gender')]);
  }
};
