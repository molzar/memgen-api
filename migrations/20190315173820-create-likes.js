"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "likes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
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
        id_post: {
          type: Sequelize.INTEGER,
          references: {
            model: "posts",
            key: "id",
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        like: {
          type: Sequelize.INTEGER,
          allowNull: true,
          isInt: true,
          defaultValue: null
        }
      },
      {
        timestamps: false
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("likes");
  }
};
