"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "comments",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_post: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
          as: "id_post"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
          as: "id_user"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      text_comment: {
        type: DataTypes.STRING(4000),
        allowNull: true,
        defaultValue: null
      },
      id_parent: {
        type: DataTypes.INTEGER,
        references: {
          model: "comments",
          key: "id",
          as: "id_parent"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: false
    }
  );

  Comments.associate = function(models) {
    Comments.belongsTo(models.posts, { foreignKey: "id_post" });
  };

  Comments.associate = function(models) {
    Comments.belongsTo(models.users, { foreignKey: "id_user" });
  };

  Comments.associate = function(models) {
    Comments.hasMany(models.comments, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      hooks: true,
      foreignKey: "id_parent",
      constraints: true
    });
  };

  return Comments;
};
