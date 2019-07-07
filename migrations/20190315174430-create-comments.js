"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "comments",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
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
        text_comment: {
          type: Sequelize.STRING(4000),
          allowNull: true,
          defaultValue: null
        },
        id_parent: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "comments",
            key: "id",
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
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
    return queryInterface.dropTable("comments");
  }
};
