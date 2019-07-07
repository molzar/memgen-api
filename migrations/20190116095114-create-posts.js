"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "posts",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        url: {
          type: Sequelize.STRING(500),
          allowNull: true,
          defaultValue: null
        },
        id_user: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        reported: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        delete_hash: {
          type: Sequelize.STRING(2000),
          allowNull: true,
          defaultValue: null
        },
        title: {
          type: Sequelize.STRING(2000),
          allowNull: true,
          defaultValue: null
        },
        width: {
          type: Sequelize.STRING(5),
          allowNull: true,
          defaultValue: null
        },
        height: {
          type: Sequelize.STRING(5),
          allowNull: true,
          defaultValue: null
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        timestamps: false
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("posts");
  }
};
