'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeamId: { type: Sequelize.INTEGER },
      homeTeamGoals: { type: Sequelize.INTEGER },
      awayTeamId: { type: Sequelize.INTEGER },
      awayTeamGoals: { type: Sequelize.INTEGER },
      inProgress: { type: Sequelize.BOOLEAN },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};