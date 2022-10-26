'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      displayName: {
        type: Sequelize.STRING,
        field: 'display_name',
      },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
