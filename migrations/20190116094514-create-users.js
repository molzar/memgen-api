'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(256),
        allowNull : false,
        validate: {
          notEmpty: true
        },
        unique: true
      },
      password: {
        type: Sequelize.STRING(4000),
        allowNull : false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull : false,
        validate: {
          isEmail: true,
          notEmpty: true
        },
        unique: true
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull : true,
        defaultValue : null
      },
      avatarurl: {
        type: Sequelize.STRING(500),
        allowNull : true,
        defaultValue : null
        
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull : true,
        isInt: true,
        defaultValue : null
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};