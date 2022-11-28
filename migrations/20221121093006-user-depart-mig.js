'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('users', 'department_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('users', 'department_id')]);
  }
};




// return Promise.all([
//   queryInterface.addConstraint('users', {
//     fields: ['department_id'],
//     type: 'foreign key',
//     references:{
//       table: 'Departments',
//       field: 'id'
//     }
//   }),
// ]);