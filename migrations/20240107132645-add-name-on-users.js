'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('users');

    if (table.name) return null;

    return queryInterface.addColumn('users', 'name', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('users');

    if (!table.name) return null;

    return queryInterface.removeColumn('users', 'name');
  }
};
