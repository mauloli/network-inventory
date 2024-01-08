'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('inventory');

    if (table.image) return null;

    return queryInterface.addColumn('inventory', 'image', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('inventory');

    if (!table.name) return null;

    return queryInterface.removeColumn('inventory', 'image');
  }
};
